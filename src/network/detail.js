import { request } from './request'
export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: './recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
    this.shopUrl = shopInfo.shopUrl
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注：images可能没有值（有些有，有些没）
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set;
    this.sizes = rule.tables
  }
}