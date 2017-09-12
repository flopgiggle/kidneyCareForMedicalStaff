// pages/diseaseDiagnosis/diseaseDiagnosis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items: [
          { name: 'USA', value: '美国23232' },
          { name: 'CHN', value: '中国sdfsdfsdf', checked: 'true' },
          { name: 'BRA', value: '巴西ffffffffffffffffffffff' },
          { name: 'JPN', value: '日本ssdf' },
          { name: 'ENG', value: '英国asddddddd' },
          { name: 'TUR', value: '法国dddddddddddddd' },
      ],
      disease: [
          { id: '1', type: 'protopathy', name: '慢性肾小球肾炎' },
          { id: '2', type: 'protopathy', name: '肾病综合征(未活检)' },
          { id: '3', type: 'protopathy', name: '慢性肾盂肾炎' },
          { id: '4', type: 'protopathy', name: '梗阻性肾病' },
          { id: '5', type: 'protopathy', name: '多囊肾' },
          { id: '6', type: 'protopathy', name: '糖尿病肾病' },
          { id: '7', type: 'protopathy', name: '高血压肾损害' },
          { id: '8', type: 'protopathy', name: '痛风性肾病' },
          { id: '9', type: 'protopathy', name: '淀粉样变' },
          { id: '10', type: 'protopathy', name: '多发性骨髓瘤' },
          { id: '11', type: 'protopathy', name: '紫癜性肾病' },
          { id: '12', type: 'protopathy', name: '狼疮肾炎' },
          { id: '13', type: 'protopathy', name: '血管炎' },
          { id: '14', type: 'protopathy', name: 'IgA肾病' },
          { id: '15', type: 'protopathy', name: '乙肝相关肾' },
          { id: '16', type: 'protopathy', name: '遗传性肾病' },
          { id: '17', type: 'protopathy', name: '药物性肾损' },
          { id: '18', type: 'protopathy', name: '间质性肾炎' },
          { id: '19', type: 'complication', name: '肾性高血压' },
          { id: '20', type: 'complication', name: '肾性贫血' },
          { id: '21', type: 'complication', name: '肾性骨病' },
          { id: '22', type: 'complication', name: '心衰' },
          { id: '23', type: 'complication', name: '消化道出血' },
          { id: '24', type: 'complication', name: '周围神经病变' },
          { id: '25', type: 'complication', name: '浆膜腔积液' },
          { id: '26', type: 'alongDisease', name: '冠心病' },
          { id: '27', type: 'alongDisease', name: 'COPD' },
          { id: '28', type: 'alongDisease', name: '肝硬化' },
          { id: '29', type: 'alongDisease', name: '脑梗塞' },
          { id: '30', type: 'alongDisease', name: '高血压' },
          { id: '31', type: 'alongDisease', name: '糖尿病' },
          { id: '32', type: 'alongDisease', name: '痛风' },
          { id: '33', type: 'alongDisease', name: '肿瘤' },
          { id: '34', type: 'alongDisease', name: '传染性疾病' },
          { id: '35', type: 'alongDisease', name: '高脂血症' },
          { id: '36', type: 'alongDisease', name: '其他（可自行填写）' }

      ],
      CKD: [{ Name: 'I期', Id: '1' }, { Name: 'II期', Id: '2' }, { Name: 'III期', Id: '3' }, { Name: 'IV期', Id: '4' }, { Name: 'V期', Id: '5' }],
      CKDIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  checkboxChange: function(e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  },
  bindCKDChange: function (e) {
      this.setData({
          CKDIndex: e.detail.value
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})