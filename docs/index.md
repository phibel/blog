# Three.js Viewer

<div id="viewerContainer" style="width: 100%; height: 600px; position: relative;">
  <canvas
    class="renderCanvas"
    data-model-src="assets/models/hisense_tv_unterschrank_part-Part.wrl"
    data-model-angle="0,0.15,1"
    data-bg-color="#1e2129"
    data-camera-far="5000"
    data-auto-rotate="false"
    data-min-distance="1"
    data-max-distance="2000"
    data-light-intensity="1.8"
    data-light-color="#ffffff"
    data-light-pos="0,1,3"
    style="width: 100%; height: 100%; display: block;"
  ></canvas>

  <!-- Fullscreen Button (bottom right corner) -->
  <button class="fullscreenBtn" style="
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 5px 12px;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    z-index: 10;
  ">⛶ Fullscreen</button>
</div>

<script type="module" src="assets/js/3DViewer.min.js"></script>
