import { DayItinerary } from '../types';

export const ITINERARY_DATA: DayItinerary[] = [
  {
    dayNumber: 1,
    date: '7/9',
    dayOfWeek: '四',
    title: '台灣 ➔ 秋田 | 東北藝術與文化散策',
    accommodation: {
      name: 'Richmond Hotel 秋田站前',
      details: 'リッチモンドホテル秋田駅前'
    },
    activities: [
      {
        id: 'd1-a1',
        time: '07:55 - 12:20',
        title: '台灣 ✈ 秋田機場',
        description: '搭乘航班前往秋田，開啟 2026 東北避暑旅程。',
        category: 'flight',
        isImportant: true
      },
      {
        id: 'd1-a2',
        time: '13:00 - 13:40',
        title: '秋田機場接駁巴士 ➔ 秋田駅西口',
        description: '搭乘機場接駁巴士「縣廳市役所線」，直達秋田站西口。車資：1,200日圓。',
        category: 'transport',
        cost: '1,200 JPY'
      },
      {
        id: 'd1-a3',
        time: '13:45 - 14:15',
        title: '飯店辦理 Check-in / 寄存行李',
        description: '步行至 Richmond Hotel 秋田站前辦理手續，稍作休息。',
        category: 'hotel'
      },
      {
        id: 'd1-a4',
        time: '14:30 - 17:30',
        title: '秋田市區藝文散策 (Citywalk)',
        description: '秋田縣立美術館 (安藤忠雄設計) ➔ 紅磚鄉土館 ➔ 舊金子家住宅 ➔ 竿燈會館 (觀賞壯觀竿燈) ➔ 千秋公園散步。',
        category: 'sightseeing'
      },
      {
        id: 'd1-a5',
        time: '18:00',
        title: '晚餐與秋田站前逛街',
        description: '品嚐秋田特色晚餐 (如比內地雞、稻庭烏龍麵)，並在站前百貨商場購物。',
        category: 'food'
      }
    ]
  },
  {
    dayNumber: 2,
    date: '7/10',
    dayOfWeek: '五',
    title: '田澤湖畔單車遊 ➔ 仙台 ➔ 山形',
    accommodation: {
      name: '山形站前大和 ROYNET 酒店',
      details: '山形駅前ダイワロイネットホテル'
    },
    activities: [
      {
        id: 'd2-a1',
        time: '09:12 - 10:13',
        title: '秋田新幹線 (小町 12號) ➔ 田澤湖駅',
        description: '乘新幹線前往田澤湖。抵達後步行2分鐘，於 Tazawako station 寄放行李。',
        category: 'transport',
        isImportant: true
      },
      {
        id: 'd2-a2',
        time: '10:45 - 10:57',
        title: '田澤湖畔巴士 (Clockwise 順時針)',
        description: '搭乘田澤湖一周巴士前往田澤湖畔。預計 10:57 抵達。',
        category: 'transport',
        link: 'https://nicklee.tw/2336/akita-tazawako/'
      },
      {
        id: 'd2-a3',
        time: '11:00 - 15:30',
        title: '田澤湖畔單車遊湖 / 午餐',
        description: '租借電動自行車、電輔車或一般淑女車遊覽神秘的琉璃色田澤湖。造訪辰子姬像、御座石神社，午餐在湖畔餐廳享用。',
        category: 'sightseeing'
      },
      {
        id: 'd2-a4',
        time: '15:30 - 16:50',
        title: '彈性行程：角館武家屋敷散策 (若下午有空)',
        description: '【方案 A】若時間充裕：16:58 於角館搭乘秋田新幹線 (小町 34號) ➔ 18:29 抵達仙台。\n【方案 B】若時間太趕：直接自田澤湖站出發 (17:12 小町 34號) ➔ 18:29 抵達仙台。',
        category: 'note'
      },
      {
        id: 'd2-a5',
        time: '18:29 - 18:40',
        title: '抵達仙台駅 | 買晚餐 / 轉乘準備',
        description: '新幹線抵達仙台後，步行5分鐘至巴士站。可在仙台站內速購便當與牛舌，或等抵達山形再享用。',
        category: 'transport'
      },
      {
        id: 'd2-a6',
        time: '18:40 - 19:47',
        title: '高速巴士 (仙台 ➔ 山形)',
        description: '仙台站前搭乘高速巴士直達山形站前，車程約 1 小時 7 分鐘。抵達後步行至山形站前大和 ROYNET 酒店入住。',
        category: 'transport'
      }
    ]
  },
  {
    dayNumber: 3,
    date: '7/11',
    dayOfWeek: '六',
    title: '羽黑山五重塔 ➔ 加茂水族館 | 庄內一日遊',
    accommodation: {
      name: '山形站前大和 ROYNET 酒店',
      details: '山形駅前ダイワロイネットホテル'
    },
    activities: [
      {
        id: 'd3-a1',
        time: '07:23 - 09:17',
        title: '高速巴士 (山形 ➔ 鶴岡 S-Mall)',
        description: '搭乘高速巴士「山形～鶴岡・酒田線」前往鶴岡。',
        category: 'transport',
        isImportant: true,
        link: 'https://www.shonaikotsu.jp/local_bus/t008_haguro.html'
      },
      {
        id: 'd3-a2',
        time: '09:40 - 10:19',
        title: '鶴岡羽黑山線公車 ➔ 羽黑隨神門',
        description: 'S-Mall 乘巴士前往「羽黑隨神門」站下車，準備朝聖出羽三山。',
        category: 'transport'
      },
      {
        id: 'd3-a3',
        time: '10:20 - 12:15',
        title: '羽黑山五重塔 & 大川商店午餐',
        description: '參觀隱身在杉木林中的國寶「羽黑山五重塔」。隨後在「大川商店」享用美味午餐。',
        category: 'sightseeing'
      },
      {
        id: 'd3-a4',
        time: '12:18 - 12:46',
        title: '巴士返回：羽黑隨神門 ➔ 一日市通り',
        description: '搭乘鶴岡羽黑山頂線往S-Mall方向，在「一日市通り」站下車轉乘。',
        category: 'transport'
      },
      {
        id: 'd3-a5',
        time: '13:12 - 13:43',
        title: '湯野濱溫泉線公車 ➔ 加茂水族館',
        description: '於一日市通り搭乘「湯野濱溫泉線 [經加茂]」巴士前往加茂水族館。',
        category: 'transport'
      },
      {
        id: 'd3-a6',
        time: '13:43 - 16:11',
        title: '世界第一水母：加茂水族館',
        description: '參觀以數萬隻水母著稱的「加茂水族館」。水母夢幻圓型大水槽非常震撼。門票：1,500日圓。',
        category: 'sightseeing',
        cost: '1,500 JPY'
      },
      {
        id: 'd3-a7',
        time: '16:11 - 16:29',
        title: '公車返回：加茂水族館 ➔ 庄內觀光物產館',
        description: '搭乘公車前往庄內觀光物產館，準備轉乘回山形。',
        category: 'transport'
      },
      {
        id: 'd3-a8',
        time: '16:45 - 18:24',
        title: '高速巴士：庄內觀光物產館 ➔ 山形站',
        description: '搭乘高速巴士，經由月山口、西川、縣廳前回到山形站。晚餐於山形市區。',
        category: 'transport'
      }
    ]
  },
  {
    dayNumber: 4,
    date: '7/12',
    dayOfWeek: '日',
    title: '山形市 Citywalk ➔ 夢幻銀山溫泉大正浪漫夜',
    accommodation: {
      name: '山形站前大和 ROYNET 酒店',
      details: '山形駅前ダイワロイネットホテル'
    },
    activities: [
      {
        id: 'd4-a1',
        time: '09:20 - 14:00',
        title: '山形市區散策與美食',
        description: '09:30 享用特色「Dondon燒」早餐 ➔ 霞城公園 (山形城遺址) ➔ 七日町商店街 (文翔館) ➔ 午餐：sakaeya ramen (若太多人可改去紅之藏) ➔ 山形綜合館紅之藏 ➔ 回飯店短暫休息。',
        category: 'sightseeing'
      },
      {
        id: 'd4-a2',
        time: '14:52 - 15:41',
        title: 'JR 山形線：山形駅 ➔ 大石田駅',
        description: '搭乘往新庄方向的普通車，15:41 抵達大石田站。',
        category: 'transport'
      },
      {
        id: 'd4-a3',
        time: '15:55 / 16:31',
        title: '接駁巴士：大石田駅 ➔ 銀山溫泉',
        description: '搭乘公車或預約的計程車前往銀山溫泉街。公車班次約在 15:55 或 16:31 啟程。',
        category: 'transport',
        isImportant: true
      },
      {
        id: 'd4-a4',
        time: '16:30 - 19:30',
        title: '銀山溫泉街浪漫散策 & 晚餐',
        description: '在大正浪漫風情的木造溫泉街漫步、吃小點心。傍晚 19:15 - 19:30 之間，溫泉街的瓦斯燈亮起，氛圍最美。請務必在溫泉街或大石田用餐。',
        category: 'sightseeing'
      },
      {
        id: 'd4-a5',
        time: '19:30 - 20:12',
        title: '返程：銀山溫泉 ➔ 大石田駅',
        description: '搭乘已預約好的計程車 (約30分鐘車程，約 19:30 啟程) 返回大石田站。',
        category: 'transport',
        isImportant: true
      },
      {
        id: 'd4-a6',
        time: '20:12 - 20:41',
        title: '山形新幹線：大石田駅 ➔ 山形駅',
        description: '搭乘 JR 山形新幹線返回山形站。若是搭乘普通線 (19:36 ➔ 20:27) 亦可視現場彈性調整。',
        category: 'transport'
      }
    ]
  },
  {
    dayNumber: 5,
    date: '7/13',
    dayOfWeek: '一',
    title: '寶珠山立石寺 (山寺) ➔ 天童將棋水果町',
    accommodation: {
      name: '山形站前大和 ROYNET 酒店',
      details: '山形駅前ダイワロイネットホテル'
    },
    activities: [
      {
        id: 'd5-a1',
        time: '08:18 - 08:37',
        title: 'JR 仙山線：山形 ➔ 山寺',
        description: '搭乘 JR 仙山線前往山寺站。準備攀登寶珠山立石寺。',
        category: 'transport'
      },
      {
        id: 'd5-a2',
        time: '08:45 - 12:30',
        title: '挑戰千階石階：山寺爬山參拜',
        description: '攀登 1015 階石階至奧之院、五大堂，鳥瞰山寺山谷絕景。下山後在山腳名產店「えんどう本店」購買特產玉蒟蒻 (蒟蒻丸子) 享用。',
        category: 'sightseeing'
      },
      {
        id: 'd5-a3',
        time: '13:10 - 13:51',
        title: 'JR 轉乘：山寺 ➔ 羽前千歲 ➔ 天童',
        description: '13:10 仙山線 ➔ 13:21 羽前千歲。同站轉乘 13:21 山形線 ➔ 13:51 抵達天童站。',
        category: 'transport'
      },
      {
        id: 'd5-a4',
        time: '14:00 - 18:00',
        title: '天童將棋與甜點散步',
        description: '天童車站 ➔ 【午餐】水車生蕎麥 (手打そば) ➔ 舞鶴山公園散步 ➔ 腰掛庵 (Koshikakean) 享用超人氣蕨餅與大福 ➔ 天童織田歷史博物館 ➔ Fruttier (季節水果聖代) ➔ 將棋資料館。',
        category: 'sightseeing'
      },
      {
        id: 'd5-a5',
        time: '18:30',
        title: '天童 ➔ 山形 & 晚餐',
        description: '搭乘 JR 山形線返回山形站。晚餐於山形市區享用東北特色料理。',
        category: 'transport'
      }
    ]
  },
  {
    dayNumber: 6,
    date: '7/14',
    dayOfWeek: '二',
    title: '出鹽文殊堂 / 藏王御釜絕景 ➔ 仙台購物夜',
    accommodation: {
      name: '飯店仙台花園宮殿',
      details: 'ホテルガーデンパレス仙台'
    },
    activities: [
      {
        id: 'd6-a1',
        time: '09:20 - 10:20',
        title: '免費接駁巴士：上山溫泉站 ➔ 刈田停車場',
        description: '早上至「上山溫泉站」觀光案內所前搭乘免費接駁車前往藏王御釜入口。(註：山上天氣好時推薦前往，否則可彈性改為出鹽文殊堂)。',
        category: 'transport',
        link: 'https://www.zaoliza.co.jp/smmr/access/'
      },
      {
        id: 'd6-a2',
        time: '10:20 - 11:15',
        title: '藏王御釜 (火口湖) 絕景觀賞',
        description: '自刈田停車場前往觀景台。欣賞翡翠綠色的絕美火口湖「魔女的眼睛」。可搭乘單人吊椅 (Zao Kattsa Lift)。停留約 40-50 分鐘，山上設有小賣部與餐廳。',
        category: 'sightseeing',
        isImportant: true,
        link: 'https://www.town.zao.miyagi.jp/webcamera.html'
      },
      {
        id: 'd6-a3',
        time: '11:15 - 12:50',
        title: '接駁巴士返回：刈田停車場 ➔ 上山溫泉站',
        description: '搭乘 11:15 回程巴士，於 12:50 抵達上山溫泉站。',
        category: 'transport'
      },
      {
        id: 'd6-a4',
        time: '13:01 - 13:14',
        title: 'JR 山形線：上山溫泉 ➔ 山形',
        description: '回到山形站取回寄存在飯店的行李。',
        category: 'transport'
      },
      {
        id: 'd6-a5',
        time: '13:33 - 14:41',
        title: '高速巴士：山形站 ➔ 仙台市公所前',
        description: '搭乘高速巴士前往仙台 (1,100 日圓)。14:41 抵達仙台。',
        category: 'transport',
        cost: '1,100 JPY'
      },
      {
        id: 'd6-a6',
        time: '15:00',
        title: '仙台花園宮殿 Check-in',
        description: '步行至 飯店仙台花園宮殿 (Hotel Garden Palace Sendai) 入住。',
        category: 'hotel'
      },
      {
        id: 'd6-a7',
        time: '16:00 - 21:00',
        title: '仙台站前購物與晚餐 (牛舌大餐)',
        description: '在仙台站前一番町、S-PAL 等商圈購物，晚餐品嚐仙台著名的碳烤牛舌。',
        category: 'shopping'
      }
    ]
  },
  {
    dayNumber: 7,
    date: '7/15',
    dayOfWeek: '三',
    title: '日本三景松島一日遊 | 遊船與海鮮饗宴',
    accommodation: {
      name: '飯店仙台花園宮殿',
      details: 'ホテルガーデンパレス仙台'
    },
    activities: [
      {
        id: 'd7-a1',
        time: '08:20 - 08:44',
        title: 'JR 仙石東北線：仙台 ➔ 高城町',
        description: '搭乘 JR 快速列車前往高城町站。',
        category: 'transport'
      },
      {
        id: 'd7-a2',
        time: '09:18 - 09:21',
        title: 'JR 仙石線：高城町 ➔ 松島海岸',
        description: '轉乘普通車至松島海岸站。',
        category: 'transport'
      },
      {
        id: 'd7-a3',
        time: '09:30 - 10:00',
        title: '五大堂參拜',
        description: '松島地標「五大堂」，跨過紅色的透橋，欣賞松島灣美景。',
        category: 'sightseeing'
      },
      {
        id: 'd7-a4',
        time: '10:00 - 10:50',
        title: '松島灣觀光遊覽船',
        description: '搭乘松島灣遊船 (50分鐘)，近距離觀賞星羅棋布的松島群島。',
        category: 'sightseeing',
        isImportant: true
      },
      {
        id: 'd7-a5',
        time: '11:00 - 12:30',
        title: '福浦島紅色木橋散步',
        description: '走過著名的紅色福浦橋前往福浦島。島上的「福浦島茶屋」有美味的丸子和冰淇淋。',
        category: 'sightseeing'
      },
      {
        id: 'd7-a6',
        time: '12:30 - 14:00',
        title: '【午餐】牡蠣將 (牡蠣将) 碳烤 & 魚市場',
        description: '午餐享用超豐盛的「海鮮・浜焼き 牡蠣将」，隨後去松島魚市場購買伴手禮與點心。',
        category: 'food'
      },
      {
        id: 'd7-a7',
        time: '14:00 - 17:00',
        title: '瑞巖寺 ➔ 圓通院 ➔ 觀瀾亭抹茶 ➔ 松島博物館',
        description: '14:00 參觀瑞巖寺及石窟遺跡 ➔ 15:00 圓通院 ➔ 15:45 觀瀾亭享用日式抹茶並遠眺海灣 ➔ 參觀松島博物館 (門票 200 日圓，17:00 休息)。',
        category: 'sightseeing',
        cost: '200 JPY'
      },
      {
        id: 'd7-a8',
        time: '17:30 - 19:30',
        title: '【晚餐】松島庵 ➔ 渡月橋 ➔ 雄島夕陽',
        description: '晚餐於「そば処 松島庵」享用松島蕎麥麵 ➔ 走過「斬情緣」渡月橋 ➔ 19:00 - 19:30 於雄島欣賞絕美松島夕陽。',
        category: 'food'
      },
      {
        id: 'd7-a9',
        time: '19:48 - 20:28',
        title: 'JR 仙石線：松島海岸 ➔ 青葉通',
        description: '搭乘普通車返回仙台市區 (青葉通站)，步行 8 分鐘回飯店休息。',
        category: 'transport'
      }
    ]
  },
  {
    dayNumber: 8,
    date: '7/16',
    dayOfWeek: '日',
    title: 'Loople 觀光巴士 | 仙台朝市與歷史古蹟巡禮',
    accommodation: {
      name: '飯店仙台花園宮殿',
      details: 'ホテルガーデンパレス仙台'
    },
    activities: [
      {
        id: 'd8-a1',
        time: '08:00 - 09:00',
        title: '仙台朝市享用美味早餐',
        description: '從飯店步行至被稱為「仙台廚房」的仙台朝市，享用新鮮的海鮮丼或朝市小吃。',
        category: 'food'
      },
      {
        id: 'd8-a2',
        time: '09:00',
        title: '購買 Loople 仙台巴士一日券',
        description: '在仙台站前購買 Loople 巴士一日券 (車票：630日圓/人)。首班車 09:00 發車，每 20 分鐘一班。',
        category: 'transport',
        cost: '630 JPY',
        isImportant: true
      },
      {
        id: 'd8-a3',
        time: '09:20 - 10:30',
        title: '第一站：瑞鳳殿 (第四站下車)',
        description: '參觀伊達政宗長眠之處——極致奢華絢麗的桃山文化建築「瑞鳳殿」。',
        category: 'sightseeing'
      },
      {
        id: 'd8-a4',
        time: '10:50 - 13:00',
        title: '第二站：仙台市博物館 & 青葉城址',
        description: '搭乘觀光巴士至「仙台市博物館」(第五站) 參觀，隨後前往「青葉城址」(第七站) 與伊達政宗騎馬像合影，俯瞰仙台市區。在此享用午餐。',
        category: 'sightseeing'
      },
      {
        id: 'd8-a5',
        time: '13:30 - 14:30',
        title: '第三站：大崎八幡宮 (第十一站下車)',
        description: '參觀國寶大崎八幡宮，欣賞其漆黑莊嚴且帶有金色雕刻的社殿。',
        category: 'sightseeing'
      },
      {
        id: 'd8-a6',
        time: '14:50 - 17:00',
        title: '第四站：仙台媒體中心 & 定禪寺通',
        description: '第十二站下車。參觀伊東豐雄設計的「仙台媒體中心」(Mediatheque)，並在定禪寺通的櫸木林蔭道下散步、喝咖啡。',
        category: 'sightseeing'
      },
      {
        id: 'd8-a7',
        time: '18:00 - 21:00',
        title: '晚餐 ➔ AER 展望台看夜景',
        description: '於仙台市區吃晚餐。隨後前往 AER 展望台欣賞仙台繁華的市區夜景 (免費入場)。',
        category: 'sightseeing'
      }
    ]
  },
  {
    dayNumber: 9,
    date: '7/17',
    dayOfWeek: '五',
    title: '竹駒神社 ➔ 金蛇水神社 | 仙台 ✈ 台北',
    accommodation: {
      name: '溫暖的家',
      details: '台北'
    },
    activities: [
      {
        id: 'd9-a1',
        time: '07:30 - 07:52',
        title: 'JR 東北本線：仙台 ➔ 岩沼',
        description: '辦理退房，攜帶行李。搭火車抵達岩沼站。寄放行李於岩沼站寄物櫃。',
        category: 'transport',
        isImportant: true
      },
      {
        id: 'd9-a2',
        time: '08:05 - 09:35',
        title: '日本三大稻荷：竹駒神社參拜',
        description: '從岩沼站步行15分鐘抵達竹駒神社 (08:20)，參拜求商賣繁盛 ➔ 09:20 步行15分鐘返回岩沼站。',
        category: 'sightseeing'
      },
      {
        id: 'd9-a3',
        time: '09:40 - 09:56',
        title: '岩沼市民巴士 ➔ 金蛇水神社',
        description: '岩沼站西口搭乘「駅西／平等・三色吉方面循環線」至金蛇水神社。',
        category: 'transport'
      },
      {
        id: 'd9-a4',
        time: '10:00 - 11:45',
        title: '能量景點：金蛇水神社參拜',
        description: '參拜著名的求財運「金蛇水神社」，摸蛇形石。可在附屬的時髦小賣部、咖啡廳買特色點心 (如蛇型麵包) 休息。',
        category: 'sightseeing'
      },
      {
        id: 'd9-a5',
        time: '11:48 - 12:02',
        title: '巴士返回：金蛇水神社 ➔ 岩沼車站',
        description: '搭乘循環線巴士回到岩沼站。',
        category: 'transport'
      },
      {
        id: 'd9-a6',
        time: '12:15 - 14:17',
        title: '午餐方案與前往仙台機場',
        description: '【方案 A: 岩沼用餐】岩沼站步行取行李。步行 9 分鐘至油蕎麥麵/Torihana 吃午餐 ➔ 岩沼 (13:43) ➔ 名取 (13:49) ➔ 轉乘機場線至仙台機場 (14:17)。\n【方案 B: 名取用餐】取行李 ➔ 岩沼 (12:22) ➔ 名取 (12:29)。名取站步行13分鐘至「花的茶屋/Yanagi」吃午餐 ➔ 名取 (14:04) 機場捷運線 (419日圓) ➔ 仙台機場 (14:17)。',
        category: 'food',
        cost: '419 JPY'
      },
      {
        id: 'd9-a7',
        time: '14:17 - 16:05',
        title: '仙台機場 Check-in & 免稅店',
        description: '提前兩小時抵達機場辦理報到，購買最後的手信伴手禮。',
        category: 'flight',
        isImportant: true
      },
      {
        id: 'd9-a8',
        time: '16:05 - 18:55',
        title: '仙台機場 ✈ 台北桃園機場',
        description: '搭乘航班返回台灣，圓滿結束 2026 東北九日悠閒之旅！',
        category: 'flight'
      }
    ]
  }
];

export const MAP_DATA = {
  pleasureBoat: [
    { time: '10:00 - 10:50', route: '松島周遊觀光船 A 班次', type: '推薦' },
    { time: '11:00 - 11:50', route: '松島周遊觀光船 B 班次', type: '備用' },
    { time: '12:00 - 12:50', route: '松島周遊觀光船 C 班次', type: '備用' },
    { time: '13:00 - 13:50', route: '松島周遊觀光船 D 班次', type: '備用' }
  ],
  loopleSendai: [
    { stop: '1', name: '仙台站前', desc: 'LOOPLE 巴士起點，1樓西口16號乘車處' },
    { stop: '4', name: '瑞鳳殿前', desc: '桃山風格政宗公陵廟，步行5分至入口' },
    { stop: '5', name: '仙台市博物館', desc: '館藏政宗公盔甲及仙台歷史文物' },
    { stop: '7', name: '青葉城址', desc: '伊達政宗騎馬像所在地，眺望仙台市街' },
    { stop: '11', name: '大崎八幡宮前', desc: '安土桃山時代國寶神社，主祭應神天皇' },
    { stop: '12', name: '媒體中心前', desc: '定禪寺通櫸木大道與伊東豐雄經典建築' }
  ]
};
