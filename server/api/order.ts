export default defineEventHandler((event) => {
  const data = {
    "status": true,
    "result": {
      "userInfo": {
        "address": {
          "zipcode": 802,
          "detail": "文山路23號"
        },
        "name": "Joanne Chen",
        "phone": "0912345678",
        "email": "example@gmail.com"
      },
      "_id": "653e335a13831c2ac8c389bb",
      "roomId": {
        "name": "尊爵雙人房",
        "description": "享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。",
        "imageUrl": "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png",
        "imageUrlList": [
          "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-2.png",
          "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-3.png",
          "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-4.png",
          "https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-5.png?raw=true"
        ],
        "areaInfo": "24坪",
        "bedInfo": "一張大床",
        "maxPeople": 4,
        "price": 10000,
        "status": 1,
        "layoutInfo": [
          {
            "title": "市景",
            "isProvide": true
          }
        ],
        "facilityInfo": [
          {
            "title": "平面電視",
            "isProvide": true
          }
        ],
        "amenityInfo": [
          {
            "title": "衛生紙",
            "isProvide": true
          }
        ],
        "_id": "653e4661336cdccc752127a0",
        "createdAt": "2023-10-29T11:47:45.641Z",
        "updatedAt": "2023-10-29T11:47:45.641Z"
      },
      "checkInDate": "2023-06-17T16:00:00.000Z",
      "checkOutDate": "2023-06-18T16:00:00.000Z",
      "peopleNum": 2,
      "orderUserId": "6533f0ef4cdf5b7f762747b0",
      "status": 0,
      "createdAt": "2023-10-29T10:26:34.498Z",
      "updatedAt": "2023-10-29T10:26:34.498Z"
    }
  }
  return { ...data };
});

