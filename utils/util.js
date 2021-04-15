function ajax(name, data) {
  return new Promise((resovle, reject) => {
    wx.request({
      // url: 'https://ruangong.tian999.top/' + name,
      url: 'http://192.168.1.102:8000/' + name,
      method: 'GET',
      // 使用data传递参数，只能用get方法
      data: data,
      success: resovle, // resolve 会让success的返回值 res return
      fail: reject
    })
  })
}

function ajaxPOST(baseUrl, data, name) {
  console.log(data)
  console.log(JSON.stringify(data))
  return new Promise((resovle, reject) => {
    wx.request({
      url: baseUrl + name,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      // data: {
      //   message: data
      // },
      success: resovle, // resolve 会让success的返回值 res return
      fail: reject
      // success: function(msg) {
      //   console.log(msg)
      //   resovle()
      // }
    })
  })
}

function formatData(data) {
  const nameData = []
  for (let i = 0; i < data.length; i++) {
    const arr = data[i].garbage_list
    nameData[i] = arr.slice(0, arr.length / 2)
  }
  console.log(nameData)
  return nameData
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getRandomGarbage = (data) => {
  let i = Math.floor(Math.random() * 26)
  const j = Math.floor(Math.random() * (data[i].length - 1))
  // console.log(1, data[i][j])
  return data[i][j] || getRandomGarbage(data)
}

module.exports = {
  formatTime,
  ajax,
  ajaxPOST,
  formatData,
  getRandomGarbage
}