<template>
  <GmapMap
  class="google-map"
    ref="gMap"
    :center="{ lat: 32.109333, lng: 34.855499 }"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 700px; height: 500px"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="centerMap(m.position)"
    />
    <GmapInfoWindow>gfds</GmapInfoWindow>
  </GmapMap>
</template>
<script>
export default {

  data() {
    return {
      zoom:7,
      markers: [
        { position: { lat: 32.109333, lng: 34.855499 } },
        { position: { lat: 31.771959, lng: 35.217018 } },
        { position: { lat: 31.3004, lng: 34.935688 } },
        { position: { lat: 32.699635, lng: 35.303547 } },
      ],
    };
  },
  methods: {
    centerMap(pos) {
      this.$refs.gMap.panTo(pos);
      this.zoom=10;
    },
  },
};
</script>
