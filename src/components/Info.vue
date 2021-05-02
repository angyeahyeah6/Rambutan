<template>
  <div id="info">
    <div class="info-container">
      <div class="info-left">
        <div class="info-main">
          <div class="info-title">
            <div class="info-service-name">Youtube</div>
            <div class="info-level">Premium</div>
            <img class="info-setting-btn" :src="setting" />
          </div>

          <div class="info-detail">
            <div class="info-plan-label-container">
              <div class="info-detail-label">NT$ 240 / family / month</div>
              <div class="info-detail-label">Payment Deadline</div>
            </div>
            <div class="info-plan-context-container">
              <div class="info-detail-context">Split for 4 people</div>
              <div class="info-detail-context">1 week befor start</div>
            </div>
          </div>
        </div>
        <div class="info-plan">
          <div class="round-btn">New Round</div>
          <div class="info-plan-detail-container">
            <div class="info-plan-label-container">
              <div class="info-plan-label">Plan Start</div>
              <div class="info-plan-label">Plan End</div>
            </div>
            <div class="info-plan-date-container">
              <div class="info-plan-date">-</div>
              <div class="info-plan-date">-</div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="info-announ"></div>
        <div class="info-admin"></div>
      </div>
    </div>
    <div class="info-table"></div>
  </div>
</template>

<script>
import setting from "../assets/setting.png";
export default {
  data() {
    return {
      setting,
    };
  },
};
</script>

<style lang="less" scoped>
#info {
  display: flex;
  flex-direction: column;
  // justify-content:
}
.info-container {
  // background-color: yellow;
  width: 100%;
  height: 400px;
}
.info-left {
  width: 50%;
  height: 100%;
}
.info-main {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .info-title {
    width: 100%;
    color: #000000;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .info-service-name {
      font-weight: 700;
      font-size: 30px;
      margin-right: 40px;
    }
    .info-level {
      font-size: 30px;
      margin-right: 40px;
      font-weight: 400;
    }
  }
}

.info-detail {
  width: 100%;
  font-size: 16px;
  margin-top: 30px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  .info-plan-label-container {
    margin-right: 70px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .info-detail-label,
  .info-detail-context {
    margin-bottom: 30px;
  }
}

.info-plan {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .round-btn {
    width: 130px;
    height: 40px;
    background: #f5f5f5;
    border: 1px solid #d9d9d9;
    border-radius: 50px;

    font-size: 16px;
    color: #bfbfbf;
    font-weight: 700;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .info-plan-detail-container {
    margin-top: 40px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    .info-plan-label-container {
      margin-right: 130px;
    }

    .info-plan-label,
    .info-plan-date {
      margin-bottom: 30px;
    }
  }
}

.info-right {
  background-color: blue;
}
.info-table {
  background-color: green;
}
</style>
