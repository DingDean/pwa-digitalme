<template>
<div id='three-container'>
</div>
</template>

<script>
import * as THREE from 'three'

export default {
  data () {
    return {
      scene: null,
      camera: null,
      renderer: null
    }
  },

  mounted () {
    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    let renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    let box = new THREE.BoxGeometry(1, 1, 1)
    let mat = new THREE.MeshBasicMaterial({color: 0x00ff00})
    let cube = new THREE.Mesh(box, mat)
    scene.add(cube)

    document.getElementById('three-container').appendChild(renderer.domElement)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    this.animate()
  },

  methods: {
    animate () {
      window.requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style>
#three-container {
  position: fixed;
  top: 0;
  z-index: -1000;
}
</style>
