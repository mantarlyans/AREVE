/* ARÉVE — 3D-пергола в реальном солнце Еревана (40°11′ с. ш.).
   Нужны глобальные THREE (r128) и, по желанию, THREE.OrbitControls. Без WebGL — статичное фото (.no3d).
   Оси сцены: +x восток, −x запад, +z юг, −z север (у стены дома). */
(function(){
  const LAT = 40.18 * Math.PI / 180;
  /* высота и азимут солнца: h — местное время (солнечный полдень ≈13:00 по UTC+4), day — день года */
  function sunAt(h, day){
    const decl = 23.44 * Math.PI / 180 * Math.sin(2 * Math.PI * (284 + day) / 365);
    const ha = (h - 13) * 15 * Math.PI / 180;
    const el = Math.asin(Math.sin(LAT) * Math.sin(decl) + Math.cos(LAT) * Math.cos(decl) * Math.cos(ha));
    const az = Math.atan2(Math.sin(ha), Math.cos(ha) * Math.sin(LAT) - Math.tan(decl) * Math.cos(LAT)); // от юга, + к западу
    return { el, az };
  }
  window.AreveSun = sunAt;

  window.ArevePergola = function(el, o){
    o = o || {};
    let ok = !!window.THREE;
    if (ok) { try { const c = document.createElement('canvas'); ok = !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { ok = false; } }
    if (!ok) { el.classList.add('no3d'); return null; }
    const T = THREE;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const st = { hour: o.hour ?? 14, day: o.day ?? 172, mode: o.mode || 'auto', glass: !!o.glass, w: o.w ?? 5, d: o.d ?? 4 };
    let phi = 0, phiTarget = 0, info = {}, visible = true, dirty = true;

    const renderer = new T.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);

    const scene = new T.Scene();
    scene.fog = new T.Fog(0x1a1814, 26, 60);
    const cam = new T.PerspectiveCamera(36, 1, 0.1, 200);
    cam.position.set(o.camX ?? 9.5, o.camY ?? 5.2, o.camZ ?? 10.5);

    let ctr = null;
    if (T.OrbitControls && o.controls !== false) {
      ctr = new T.OrbitControls(cam, renderer.domElement);
      ctr.target.set(0, 1.25, 0);
      ctr.enableDamping = true; ctr.enablePan = false;
      ctr.minDistance = 7; ctr.maxDistance = 22; ctr.maxPolarAngle = Math.PI * 0.47;
      ctr.enableZoom = o.zoom !== false;
      ctr.autoRotate = o.autoRotate !== false && !reduce; ctr.autoRotateSpeed = 0.45;
      if (o.touchRotate === false && matchMedia('(pointer: coarse)').matches) { ctr.enableRotate = false; renderer.domElement.style.touchAction = 'pan-y'; }
      ctr.addEventListener('start', () => { ctr.autoRotate = false; });
      renderer.domElement.tabIndex = 0; renderer.domElement.setAttribute('aria-label', '3D');
      renderer.domElement.addEventListener('focus', () => { ctr.autoRotate = false; });
      ctr.addEventListener('change', () => { dirty = true; });
    }

    if (!ctr) cam.lookAt(0, 1.25, 0);

    /* свет */
    const hemi = new T.HemisphereLight(0xf3e9d8, 0x3a3128, 0.5); scene.add(hemi);
    const sunL = new T.DirectionalLight(0xffe2b0, 2.4);
    sunL.castShadow = true; sunL.shadow.mapSize.set(2048, 2048);
    Object.assign(sunL.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 70 });
    sunL.shadow.bias = -0.0004; sunL.shadow.normalBias = 0.02;
    scene.add(sunL, sunL.target);
    const lamp = new T.PointLight(0xffc583, 0, 9, 2); lamp.position.set(0, 2.3, 0); scene.add(lamp);

    /* материалы */
    const M = (c, r, m) => new T.MeshStandardMaterial({ color: c, roughness: r ?? .8, metalness: m ?? 0 });
    const frameM = M(0x2b2824, .42, .55), louvM = M(0xdcd4c6, .45, .35), groundM = M(0xc4baa9, .96), wallM = M(0xe7e0d4, .92);
    const cvs = document.createElement('canvas'); cvs.width = cvs.height = 512;
    const g = cvs.getContext('2d');
    for (let i = 0; i < 16; i++) { g.fillStyle = ['#80614a', '#77593f', '#86684d'][i % 3]; g.fillRect(0, i * 32, 512, 30); g.fillStyle = '#4c3828'; g.fillRect(0, i * 32 + 30, 512, 2); }
    const tex = new T.CanvasTexture(cvs); tex.wrapS = tex.wrapT = T.RepeatWrapping; tex.encoding = T.sRGBEncoding;
    const deckM = new T.MeshStandardMaterial({ map: tex, roughness: .85 });
    const glassM = new T.MeshPhysicalMaterial({ color: 0xd4e2e4, transparent: true, opacity: .16, roughness: .05, side: T.DoubleSide, depthWrite: false });
    const glassEdge = new T.LineBasicMaterial({ color: 0xd8bc8e, transparent: true, opacity: .55 });

    /* окружение */
    const ground = new T.Mesh(new T.PlaneGeometry(80, 80), groundM); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    const deck = new T.Mesh(new T.BoxGeometry(1, .08, 1), deckM); deck.receiveShadow = true; scene.add(deck);
    const wall = new T.Mesh(new T.BoxGeometry(1, 4.4, .3), wallM); wall.castShadow = wall.receiveShadow = true; scene.add(wall);
    const furn = new T.Group(); scene.add(furn);
    const table = new T.Mesh(new T.BoxGeometry(1.9, .06, .95), M(0xece7df, .55)); table.position.y = .75; furn.add(table);
    const legG = new T.BoxGeometry(.07, .72, .07);
    [[-.85, -.4], [.85, -.4], [-.85, .4], [.85, .4]].forEach(([x, z]) => { const l = new T.Mesh(legG, frameM); l.position.set(x, .36, z); furn.add(l); });
    [-.9, .9].forEach(z => { const b = new T.Mesh(new T.BoxGeometry(1.7, .44, .42), M(0x8d7b66, .9)); b.position.set(0, .22, z); furn.add(b); });
    const pot = new T.Mesh(new T.CylinderGeometry(.28, .22, .6, 24), M(0x6a6357, .9)); furn.add(pot);
    const plant = new T.Mesh(new T.SphereGeometry(.5, 20, 16), M(0x5c6b4a, .95)); furn.add(plant);
    furn.traverse(m => { if (m.isMesh) m.castShadow = m.receiveShadow = true; });

    const perg = new T.Group(), glassG = new T.Group(); scene.add(perg, glassG);
    let louvres = [];
    const H = 2.6;
    function build(){
      perg.clear(); glassG.clear(); louvres = [];
      const w = st.w, d = st.d;
      deck.scale.set(w + 2.6, 1, d + 2.8); deck.position.set(0, .04, .35);
      tex.repeat.set((w + 2.6) / 2.4, (d + 2.8) / 2.4);
      wall.scale.set(w + 8, 1, 1); wall.position.set(0, 2.2, -d / 2 - .7);
      pot.position.set(w / 2 + .7, .3, d / 2 + .3); plant.position.set(w / 2 + .7, .95, d / 2 + .3);
      const post = new T.BoxGeometry(.16, H, .16);
      [[-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]].forEach(([x, z]) => { const p = new T.Mesh(post, frameM); p.position.set(x, H / 2, z); perg.add(p); });
      const bx = new T.BoxGeometry(w + .16, .26, .16), bz = new T.BoxGeometry(.16, .26, d);
      [-d / 2, d / 2].forEach(z => { const b = new T.Mesh(bx, frameM); b.position.set(0, H + .13, z); perg.add(b); });
      [-w / 2, w / 2].forEach(x => { const b = new T.Mesh(bz, frameM); b.position.set(x, H + .13, 0); perg.add(b); });
      const n = Math.max(8, Math.round(d / .2)), step = d / n;
      const lg = new T.BoxGeometry(w - .12, .03, step * 1.08);
      for (let i = 0; i < n; i++) { const l = new T.Mesh(lg, louvM); l.position.set(0, H + .13, -d / 2 + step * (i + .5)); perg.add(l); louvres.push(l); }
      perg.traverse(m => { if (m.isMesh) m.castShadow = m.receiveShadow = true; });
      const pane = (pw, x, z, ry) => {
        const p = new T.Mesh(new T.PlaneGeometry(pw, H), glassM); p.position.set(x, H / 2, z); p.rotation.y = ry; glassG.add(p);
        const e = new T.LineSegments(new T.EdgesGeometry(p.geometry), glassEdge); e.position.copy(p.position); e.rotation.y = ry; glassG.add(e);
      };
      const k = 3; // три створки по фасаду — Butterfly / раздвижное, условно
      for (let i = 0; i < k; i++) pane(w / k, -w / 2 + w / k * (i + .5), d / 2, 0);
      pane(d, -w / 2, 0, Math.PI / 2); pane(d, w / 2, 0, Math.PI / 2);
      glassG.visible = st.glass;
      update();
    }

    const cNight = new T.Color(0x1a1814), cDusk = new T.Color(0x4a3a2c), cDay = new T.Color(0xd9cfbe), tmp = new T.Color();
    function update(){
      const s = sunAt(st.hour, st.day), up = s.el > 0;
      const dir = new T.Vector3(-Math.sin(s.az) * Math.cos(s.el), Math.sin(s.el), Math.cos(s.az) * Math.cos(s.el));
      sunL.position.copy(dir).multiplyScalar(32); sunL.target.position.set(0, 0, 0);
      const elDeg = s.el * 180 / Math.PI, k = Math.max(0, Math.min(1, elDeg / 40));
      sunL.intensity = up ? 0.4 + 2.4 * Math.min(1, Math.sin(s.el) * 2.4) : 0;
      sunL.color.setHSL(.085, .85, .62 + .3 * k);
      hemi.intensity = up ? .22 + .5 * k : .1;
      lamp.intensity = up ? 0 : 1.4;
      if (elDeg > 6) tmp.copy(cDusk).lerp(cDay, Math.min(1, (elDeg - 6) / 34)); else tmp.copy(cNight).lerp(cDusk, Math.max(0, (elDeg + 6) / 12));
      scene.background = tmp.clone(); scene.fog.color.copy(tmp);
      renderer.toneMappingExposure = up ? .95 : .8;
      if (st.mode === 'closed') phiTarget = 0;
      else if (st.mode === 'open') phiTarget = Math.PI * .49;
      else phiTarget = up ? Math.max(-1.45, Math.min(1.45, Math.atan2(dir.z, dir.y))) : Math.PI * .49; // ночью открыто — небо над столом
      if (reduce) phi = phiTarget;
      info = { el: elDeg, az: (s.az * 180 / Math.PI + 180 + 360) % 360, up, louvre: Math.abs(phiTarget * 180 / Math.PI) };
      dirty = true;
      return info;
    }

    function resize(){
      const r = el.getBoundingClientRect(); if (!r.width) return;
      renderer.setSize(r.width, r.height, false);
      renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
      cam.aspect = r.width / r.height; cam.updateProjectionMatrix(); dirty = true;
    }
    new ResizeObserver(resize).observe(el);
    if ('IntersectionObserver' in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(el);

    function tick(){
      requestAnimationFrame(tick);
      if (!visible) return;
      const moving = Math.abs(phi - phiTarget) > .001;
      if (moving) phi += (phiTarget - phi) * .06;
      if (louvres.length && louvres[0].rotation.x !== phi) { louvres.forEach(l => { l.rotation.x = phi; }); dirty = true; }
      if (ctr) { ctr.update(); if (ctr.autoRotate) dirty = true; }
      if (dirty) { renderer.render(scene, cam); dirty = false; }
    }
    build(); resize(); louvres.forEach(l => { l.rotation.x = phi; }); tick();

    return {
      set(p){ const rebuild = ('w' in p && p.w !== st.w) || ('d' in p && p.d !== st.d); Object.assign(st, p); glassG.visible = st.glass; if (rebuild) build(); return update(); },
      /* поворот камеры вокруг перголы (угол в радианах), для сцен без OrbitControls */
      view(a, r, y){ r = r ?? Math.hypot(cam.position.x, cam.position.z); cam.position.set(r * Math.sin(a), y ?? cam.position.y, r * Math.cos(a)); cam.lookAt(0, 1.25, 0); dirty = true; },
      get info(){ return info; },
      get state(){ return Object.assign({}, st); }
    };
  };
})();
