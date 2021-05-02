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
    <div class="info-table">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
        <!-- <span slot="action" slot-scope="text, record">
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
        </span> -->
      </a-table>
    </div>
  </div>
</template>

<script>
import setting from "../assets/setting.png";
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
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    user: "Frank",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    user: "Kevin",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export default {
  data() {
    return {
      setting,

      data,
      columns,
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
  // background-color: green;
}
</style>
