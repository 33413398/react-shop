import React, { Component } from 'react'
import './style.css'

/* var option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' },
      ],
    },
  ],
} */
export default class LineComponent extends Component {
  /*  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  } */
  render() {
    return (
      <div className="contentBox">
        <ul className="ListBox">
          <li className="ListLi">
            <div className="liTop">
              <div className="imgBox">
                <img src="http://cve.scap.org.cn/static/img/viewicons/bigdata.png" width="100%" alt="image" />
              </div>
              <h3 className="h3Box">大数据漏洞库</h3>
              <div className="checkXQ">查看详情&gt;&gt;</div>
            </div>
            <div className="liBottom">
              <div className="bottomFl">
                <p>
                  漏洞总数：<span className="bugSum">192</span>
                </p>
                <p>
                  含有Exp/PoC的漏洞：<span className="PoCbug">58</span>
                </p>
                <p>
                  更新日期：<span className="UPtime">2020-12-10</span>
                </p>
              </div>
              <div className="bottomFr" id="main" />
            </div>
          </li>
          <li className="ListLi">
            <div className="liTop">
              <div className="imgBox">
                <img src="http://cve.scap.org.cn/static/img/viewicons/bigdata.png" width="100%" alt="image" />
              </div>
              <h3 className="h3Box">大数据漏洞库</h3>
              <div className="checkXQ">查看详情&gt;&gt;</div>
            </div>
            <div className="liBottom">
              <div className="bottomFl">
                <p>
                  漏洞总数：<span className="bugSum">192</span>
                </p>
                <p>
                  含有Exp/PoC的漏洞：<span className="PoCbug">58</span>
                </p>
                <p>
                  更新日期：<span className="UPtime">2020-12-10</span>
                </p>
              </div>
              <div className="bottomFr" id="main" />
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
