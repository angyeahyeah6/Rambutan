<template>
  <div id="info">
    <div class="info-container">
      <div class="info-left">
        <div class="info-main">
          <div class="info-title">
            <div class="info-service-name">Youtube</div>
            <div class="info-level">Premium</div>
            <a-icon type="setting" />
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
        <div class="info-card info-announce">
          <div class="info-card-title">Announcement</div>
          <textarea />
        </div>
        <div class="info-card info-admin">
          <div class="info-card-title">Admin Info</div>
          <div class="info-card-content">
            <div class="info-profile-name">
              <img :src="user" />
              <div class="info-name">
                <div>Carolyn</div>
                <a-rate :default-value="2.5" allow-half />
              </div>
            </div>
            <div class="info-profile-contact">
              <div>carolyn@gmail.com</div>
              <div>(812) 1234-567890</div>
            </div>
          </div>
          <div class="info-import-btn-container">
            <div class="info-import-btn">Import bank info</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-table">
      <a-table :columns="columns" :data-source="data"> </a-table>
    </div>
  </div>
</template>

<script>
import user from "../assets/user.png";

const columns = [
  {
    title: "User",
    key: "user",
    dataIndex: "user",
    scopedSlots: { customRender: "user" },
  },
  {
    title: "Interval",
    key: "interval",
    dataIndex: "interval",
    scopedSlots: { customRender: "interval" },
  },
  {
    title: "Date",
    key: "date",
    dataIndex: "date",
    scopedSlots: { customRender: "date" },
  },
  {
    title: "State",
    key: "state",
    dataIndex: "state",
    scopedSlots: { customRender: "state" },
  },
  {
    title: "Payment Deadline",
    key: "deadline",
    scopedSlots: { customRender: "deadline" },
  },
  {
    title: "Actions",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
const data = [
  {
    key: "1",
    user: "Angela yeah",
  },
  {
    key: "2",
    user: "Frank",
  },
  {
    key: "3",
    user: "Kevin",
  },
];
export default {
  data() {
    return {
      user,

      data,
      columns,
    };
  },
};
</script>

<style lang="less" scoped>
#info {
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: space-between;
}
.info-container {
  // background-color: yellow;
  width: 100%;
  height: 350px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
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
    .anticon {
      font-size: 25px;
      cursor: pointer;
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
  margin-top: 30px;

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
    cursor: not-allowed;
  }

  .info-plan-detail-container {
    // margin-top: 40px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    .info-plan-label-container {
      margin-right: 130px;
    }

    .info-plan-label,
    .info-plan-date {
      margin-top: 30px;
    }
  }
}

.info-right {
  // background-color: blue;
  width: 50%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  .info-card {
    width: 48%;
    height: 97%;
    border: #d9d9d9 solid 1px;
    border-radius: 10px;
    padding: 30px;
    color: #828282;

    .info-card-title {
      font-size: 16px;
      margin-bottom: 30px;
    }
    textarea {
      width: 100%;
      height: 60%;
      border-color: #d9d9d9;
      border-radius: 2px;
    }
    .info-import-btn-container {
      margin-top: 70px;

      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .info-import-btn {
        font-size: 14px;
        color: #000000;
        width: 132px;
        height: 32px;
        border: #d9d9d9 solid 1px;
        border-radius: 50px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .info-announce {
    margin-right: 20px;
  }
  .info-card-content {
    .info-profile-name {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 50px;
        margin-right: 20px;
      }
    }
    .info-profile-contact {
      margin-top: 10px;
      div {
        margin-top: 20px;
      }
    }
  }
}
.info-table {
  // background-color: green;
  margin-top: 60px;
}
</style>
