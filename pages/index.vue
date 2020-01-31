<template>
  <div class="home">
    <headers />
    <div class="s_container">
      <el-row>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <div class="personal">
              asdas
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import headers from '@/components/layout/headers.vue'
export default {
  name: 'Home',
  components: {
    headers
  },
  data() {
    return {
      da: ''
    }
  }
}
</script>

<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.s_container {
  .bg-purple-light {
    width: 96%;
    background: #fff;
    float: right;
  }
}
@media (max-width: 639px) {
  .s_container {
    width: 100%;
  }
}
</style>
