// 引用链接: https://raw.githubusercontent.com/Yswag/xptv-extensions/main/js/jianpian.js
let appConfig = {
    ver: 20260318,
    title: 'jianpian',
    // h5v2.cibnabg.com
    // site: 'https://ev5356.970xw.com',
    site: 'https://api.ztcgi.com',
    imgDomain: 'img.jgsfnl.com',
    tabs: [
        { name: '首頁', ext: { id: 'home' }, ui: 1 },
        { name: '電影', ext: { id: 1 } },
        { name: '電視劇', ext: { id: 2 } },
        { name: '動漫', ext: { id: 3 } },
        { name: '綜藝', ext: { id: 4 } },
        { name: '紀錄片', ext: { id: 50 } },
        { name: 'Netflix', ext: { id: 99 } },
    ],
}
let filterObj = {
    1: [
        {
            key: 'cateId',
            name: '分类',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '剧情' },
                { v: '2', n: '爱情' },
                { v: '3', n: '动画' },
                { v: '4', n: '喜剧' },
                { v: '5', n: '战争' },
                { v: '6', n: '歌舞' },
                { v: '7', n: '古装' },
                { v: '8', n: '奇幻' },
                { v: '9', n: '冒险' },
                { v: '10', n: '动作' },
                { v: '11', n: '科幻' },
                { v: '12', n: '悬疑' },
                { v: '13', n: '犯罪' },
                { v: '14', n: '家庭' },
                { v: '15', n: '传记' },
                { v: '16', n: '运动' },
                { v: '18', n: '惊悚' },
                { v: '20', n: '短片' },
                { v: '21', n: '历史' },
                { v: '22', n: '音乐' },
                { v: '23', n: '西部' },
                { v: '24', n: '武侠' },
                { v: '25', n: '恐怖' },
            ],
        },
        {
            key: 'area',
            name: '地區',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '国产' },
                { v: '3', n: '香港' },
                { v: '6', n: '台湾' },
                { v: '5', n: '美国' },
                { v: '18', n: '韩国' },
                { v: '2', n: '日本' },
            ],
        },
        {
            key: 'year',
            name: '年代',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '162', n: '2026' },
                { v: '107', n: '2025' },
                { v: '119', n: '2024' },
                { v: '153', n: '2023' },
                { v: '101', n: '2022' },
                { v: '118', n: '2021' },
                { v: '16', n: '2020' },
                { v: '7', n: '2019' },
                { v: '2', n: '2018' },
                { v: '3', n: '2017' },
                { v: '22', n: '2016' },
                { v: '2015', n: '2015以前' },
            ],
        },
        {
            key: 'sort',
            name: '排序',
            init: 'update',
            value: [
                { v: 'update', n: '最新' },
                { v: 'hot', n: '最热' },
                { v: 'rating', n: '评分' },
            ],
        },
    ],
    2: [
        {
            key: 'cateId',
            name: '分类',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '剧情' },
                { v: '2', n: '爱情' },
                { v: '3', n: '动画' },
                { v: '4', n: '喜剧' },
                { v: '5', n: '战争' },
                { v: '6', n: '歌舞' },
                { v: '7', n: '古装' },
                { v: '8', n: '奇幻' },
                { v: '9', n: '冒险' },
                { v: '10', n: '动作' },
                { v: '11', n: '科幻' },
                { v: '12', n: '悬疑' },
                { v: '13', n: '犯罪' },
                { v: '14', n: '家庭' },
                { v: '15', n: '传记' },
                { v: '16', n: '运动' },
                { v: '18', n: '惊悚' },
                { v: '20', n: '短片' },
                { v: '21', n: '历史' },
                { v: '22', n: '音乐' },
                { v: '23', n: '西部' },
                { v: '24', n: '武侠' },
                { v: '25', n: '恐怖' },
            ],
        },
        {
            key: 'area',
            name: '地區',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '国产' },
                { v: '3', n: '香港' },
                { v: '6', n: '台湾' },
                { v: '5', n: '美国' },
                { v: '18', n: '韩国' },
                { v: '2', n: '日本' },
            ],
        },
        {
            key: 'year',
            name: '年代',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '162', n: '2026' },
                { v: '107', n: '2025' },
                { v: '119', n: '2024' },
                { v: '153', n: '2023' },
                { v: '101', n: '2022' },
                { v: '118', n: '2021' },
                { v: '16', n: '2020' },
                { v: '7', n: '2019' },
                { v: '2', n: '2018' },
                { v: '3', n: '2017' },
                { v: '22', n: '2016' },
                { v: '2015', n: '2015以前' },
            ],
        },
        {
            key: 'sort',
            name: '排序',
            init: 'update',
            value: [
                { v: 'update', n: '最新' },
                { v: 'hot', n: '最热' },
                { v: 'rating', n: '评分' },
            ],
        },
    ],
    3: [
        {
            key: 'cateId',
            name: '分类',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '剧情' },
                { v: '2', n: '爱情' },
                { v: '3', n: '动画' },
                { v: '4', n: '喜剧' },
                { v: '5', n: '战争' },
                { v: '6', n: '歌舞' },
                { v: '7', n: '古装' },
                { v: '8', n: '奇幻' },
                { v: '9', n: '冒险' },
                { v: '10', n: '动作' },
                { v: '11', n: '科幻' },
                { v: '12', n: '悬疑' },
                { v: '13', n: '犯罪' },
                { v: '14', n: '家庭' },
                { v: '15', n: '传记' },
                { v: '16', n: '运动' },
                { v: '18', n: '惊悚' },
                { v: '20', n: '短片' },
                { v: '21', n: '历史' },
                { v: '22', n: '音乐' },
                { v: '23', n: '西部' },
                { v: '24', n: '武侠' },
                { v: '25', n: '恐怖' },
            ],
        },
        {
            key: 'area',
            name: '地區',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '国产' },
                { v: '3', n: '香港' },
                { v: '6', n: '台湾' },
                { v: '5', n: '美国' },
                { v: '18', n: '韩国' },
                { v: '2', n: '日本' },
            ],
        },
        {
            key: 'year',
            name: '年代',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '162', n: '2026' },
                { v: '107', n: '2025' },
                { v: '119', n: '2024' },
                { v: '153', n: '2023' },
                { v: '101', n: '2022' },
                { v: '118', n: '2021' },
                { v: '16', n: '2020' },
                { v: '7', n: '2019' },
                { v: '2', n: '2018' },
                { v: '3', n: '2017' },
                { v: '22', n: '2016' },
                { v: '2015', n: '2015以前' },
            ],
        },
        {
            key: 'sort',
            name: '排序',
            init: 'update',
            value: [
                { v: 'update', n: '最新' },
                { v: 'hot', n: '最热' },
                { v: 'rating', n: '评分' },
            ],
        },
    ],
    4: [
        {
            key: 'cateId',
            name: '分类',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '剧情' },
                { v: '2', n: '爱情' },
                { v: '3', n: '动画' },
                { v: '4', n: '喜剧' },
                { v: '5', n: '战争' },
                { v: '6', n: '歌舞' },
                { v: '7', n: '古装' },
                { v: '8', n: '奇幻' },
                { v: '9', n: '冒险' },
                { v: '10', n: '动作' },
                { v: '11', n: '科幻' },
                { v: '12', n: '悬疑' },
                { v: '13', n: '犯罪' },
                { v: '14', n: '家庭' },
                { v: '15', n: '传记' },
                { v: '16', n: '运动' },
                { v: '18', n: '惊悚' },
                { v: '20', n: '短片' },
                { v: '21', n: '历史' },
                { v: '22', n: '音乐' },
                { v: '23', n: '西部' },
                { v: '24', n: '武侠' },
                { v: '25', n: '恐怖' },
            ],
        },
        {
            key: 'area',
            name: '地區',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '1', n: '国产' },
                { v: '3', n: '香港' },
                { v: '6', n: '台湾' },
                { v: '5', n: '美国' },
                { v: '18', n: '韩国' },
                { v: '2', n: '日本' },
            ],
        },
        {
            key: 'year',
            name: '年代',
            init: '',
            value: [
                { v: '', n: '全部' },
                { v: '162', n: '2026' },
                { v: '107', n: '2025' },
                { v: '119', n: '2024' },
                { v: '153', n: '2023' },
                { v: '101', n: '2022' },
                { v: '118', n: '2021' },
                { v: '16', n: '2020' },
                { v: '7', n: '2019' },
                { v: '2', n: '2018' },
                { v: '3', n: '2017' },
                { v: '22', n: '2016' },
                { v: '2015', n: '2015以前' },
            ],
        },
        {
            key: 'sort',
            name: '排序',
            init: 'update',
            value: [
                { v: 'update', n: '最新' },
                { v: 'hot', n: '最热' },
                { v: 'rating', n: '评分' },
            ],
        },
    ],
}

async function getConfig() {
    appConfig.imgDomain = await getImgDomain()
    return jsonify(appConfig)
}

async function getImgDomain() {
    try {
        let { data } = await $fetch.get(`${appConfig.site}/api/v2/settings/resourceDomainConfig`, {
            headers: getHeader(),
        })
        let domain = argsify(data).data.imgDomain
        let domainList = domain.split(',')
        domain = domainList[Math.floor(Math.random() * domainList.length)]

        return domain.startsWith('http') ? domain : 'https://' + domain
    } catch (error) {
        console.log(error)
    }
}

async function getCards(ext) {
    ext = JSON.parse(ext)
    console.log(ext)

    let cards = []
    let { id, page = 1 } = ext

    if (id === 'home') {
        if (page > 1) return JSON.stringify({ list: [] })
        let url = `${appConfig.site}/api/slide/list?pos_id=88`
        const { data } = await $fetch.get(url, { headers: getHeader() })
        JSON.parse(data).data.forEach((e) => {
            const name = e.title
            const id = e.jump_id
            const pic = appConfig.imgDomain + e.thumbnail

            cards.push({
                vod_id: id.toString(),
                vod_name: name,
                vod_pic: pic,
                ext: { id: id },
            })
        })

        return JSON.stringify({ list: cards })
    } else if (id === 99 || id === 50) {
        if (page > 1) return JSON.stringify({ list: [] })
        let url = `${appConfig.site}/api/dyTag/list?category_id=${id}&page=${page}`
        const { data } = await $fetch.get(url, { headers: getHeader() })
        argsify(data).data.forEach((e) => {
            let duration = e.name
            e.dataList.forEach((item) => {
                const name = item.title
                const id = item.id
                const pic = appConfig.imgDomain + item.path
                const remarks = item.mask
                cards.push({
                    vod_id: id.toString(),
                    vod_name: name,
                    vod_pic: pic,
                    vod_remarks: remarks,
                    vod_duration: duration,
                    ext: { id: id },
                })
            })
        })

        return JSON.stringify({ list: cards })
    }

    let url = `${appConfig.site}/api/crumb/list?fcate_pid=${id}&area=${ext?.filters?.area ?? ''}&year=${ext?.filters?.year ?? ''}&type=0&sort=${ext?.filters?.sort ?? ''}&page=${page}&category_id=${ext?.filters?.cateId ?? ''}`
    console.log(url)

    const { data } = await $fetch.get(url, { headers: getHeader() })

    JSON.parse(data).data.forEach((e) => {
        const name = e.title
        const id = e.id
        const pic = appConfig.imgDomain + e.path
        cards.push({
            vod_id: id.toString(),
            vod_name: name,
            vod_pic: pic,
            vod_remarks: e.mask || '',
            ext: { id: id },
        })
    })

    return JSON.stringify({ list: cards, filter: filterObj[id] || [] })
}

async function getTracks(ext) {
    ext = JSON.parse(ext)

    let list = []
    let id = ext.id
    let url = `${appConfig.site}/api/video/detailv2?id=${id}`

    const { data } = await $fetch.get(url, { headers: getHeader() })
    try {
        JSON.parse(data).data.source_list_source.forEach((e) => {
            if (e.source_key === 'back_source_list_p2p') return
            let title = e.name
            let tracks = []
            e.source_list.forEach((item) => {
                tracks.push({
                    name: item.source_name,
                    ext: { url: item.url },
                })
            })
            list.push({
                title,
                tracks,
            })
        })
    } catch (error) {
        $print(error)
    }

    return JSON.stringify({ list: list })
}

async function getPlayinfo(ext) {
    ext = JSON.parse(ext)
    let { url } = ext
    let playUrl = url
    let header = getHeader()

    return JSON.stringify({ urls: [playUrl], headers: [header] })
}

async function search(ext) {
    ext = JSON.parse(ext)
    let cards = []

    const text = encodeURIComponent(ext.text)
    const page = ext.page || 1
    const url = `${appConfig.site}/api/v2/search/videoV2?key=${text}&category_id=88&page=${page}&pageSize=20`
    const headers = getHeader()

    const { data } = await $fetch.get(url, { headers: headers })

    JSON.parse(data).data.forEach((e) => {
        const name = e.title
        const id = e.id
        const pic = appConfig.imgDomain + e.thumbnail
        cards.push({
            vod_id: id.toString(),
            vod_name: name,
            vod_pic: pic,
            vod_remarks: e.mask || '',
            ext: { id: id },
        })
    })

    return JSON.stringify({ list: cards })
}

function getHeader() {
    return {
        'User-Agent':
            'Mozilla/5.0 (Linux; Android 9; V2196A Build/PQ3A.190705.08211809; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.114 Mobile Safari/537.36;webank/h5face;webank/1.0;netType:NETWORK_WIFI;appVersion:416;packageName:com.jp3.xg3',
        Referer: appConfig.site,
    }
}
