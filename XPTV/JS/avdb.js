// 引用链接: https://raw.githubusercontent.com/Yswag/xptv-extensions/main/js/avdb.js
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/604.1.14 (KHTML, like Gecko)'

let appConfig = {
    ver: 20251202,
    title: 'avdb',
    site: 'https://avdbapi.com/api.php/provide/vod',
}

async function getConfig() {
    let config = appConfig
    config.tabs = await getTabs()
    return jsonify(appConfig)
}

async function getTabs() {
    let tabs = []
    let url = appConfig.site

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    argsify(data).class.forEach((e) => {
        tabs.push({
            id: e.type_id,
            name: e.type_name,
            ext: {
                id: e.type_id,
            },
            ui: 1,
        })
    })

    return tabs
}

async function getCards(ext) {
    ext = argsify(ext)
    let cards = []
    let { id, page = 1 } = ext

    try {
        const url = appConfig.site + `?t=${id}&ac=detail&pg=${page}`

        const { data } = await $fetch.get(url, {
            headers: {
                'User-Agent': UA,
            },
        })

        argsify(data).list.forEach((e) => {
            cards.push({
                vod_id: `${e.id}`,
                vod_name: e.name,
                vod_pic: e.poster_url,
                vod_remarks: e.tag,
                vod_pubdate: e.created_at,
                vod_duration: e.time,
                ext: {
                    id: `${e.id}`,
                },
            })
        })

        return jsonify({
            list: cards,
        })
    } catch (error) {
        $print(error)
    }
}

async function getTracks(ext) {
    ext = argsify(ext)
    let tracks = []
    let id = ext.id
    let url = appConfig.site + `?ac=detail&ids=${id}`

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    let vod_play_url = argsify(data).list[0].episodes.server_data.Full.link_embed
    tracks.push({
        name: argsify(data).list[0].episodes.server_name,
        pan: '',
        ext: {
            url: vod_play_url,
        },
    })

    return jsonify({
        list: [
            {
                title: '默认分组',
                tracks,
            },
        ],
    })
}

async function getPlayinfo(ext) {
    ext = argsify(ext)
    let url = ext.url

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
            Referer: `https://avdbapi.com/`,
        },
    })
    // Match P.setup (used by upload18.org) or playerInstance.setup (legacy)
    let match = data.match(/(?:P|playerInstance)\.setup\(\s*(\{[\s\S]*?\})\s*\);/) ||
                data.match(/\.setup\(\s*(\{[\s\S]*?\})\s*\);/);
    if (!match) {
        console.log('[getPlayinfo] Could not find setup call in page');
        // Fallback: try to extract m3u8 URL directly
        const m3u8Match = data.match(/_m3u8Url\s*=\s*["']([^"']+)["']/) ||
                          data.match(/file:\s*["']([^"']+\.m3u8[^"']*)["']/);
        if (m3u8Match) {
            console.log('[getPlayinfo] Found direct m3u8 URL:', m3u8Match[1]);
            return jsonify({ urls: [m3u8Match[1]], headers: [{ 'User-Agent': UA, Referer: `${url}/` }] });
        }
        throw new Error('No setup call or m3u8 URL found');
    }
    let obj = match[1]
    console.log('[getPlayinfo] Found setup object:', obj.substring(0, 200))
    
    const aboutlinkMatch = obj.match(/aboutlink:\s*["']([^"']+)["']/)
    // file is a variable (fileUrl) in the setup object, so we need to extract the actual m3u8 URL
    
    // Extract PLAYER_CONFIG.m3u8 from the page
    const configMatch = data.match(/window\.PLAYER_CONFIG\s*=\s*\{[\s\S]*?m3u8:\s*["']([^"']+)["']/)
    if (!configMatch) {
        console.log('[getPlayinfo] Could not find PLAYER_CONFIG.m3u8')
        throw new Error('No m3u8 URL found in page')
    }
    
    let m3u8Path = configMatch[1]
    // If it's a relative path, prepend the origin
    if (m3u8Path.startsWith('/')) {
        const urlObj = new URL(url)
        m3u8Path = urlObj.origin + m3u8Path
    }
    
    console.log('[getPlayinfo] Found m3u8 URL:', m3u8Path)
    return jsonify({ urls: [m3u8Path], headers: [{ 'User-Agent': UA, Referer: `${url}/` }] })
}

async function search(ext) {
    ext = argsify(ext)
    let cards = []

    const text = encodeURIComponent(ext.text)
    const page = ext.page || 1
    const url = `${appConfig.site}?ac=detail&wd=${text}&pg=${page}`

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    argsify(data).list.forEach((e) => {
        cards.push({
            vod_id: `${e.id}`,
            vod_name: e.name,
            vod_pic: e.poster_url,
            vod_remarks: e.tag,
            vod_pubdate: e.created_at,
            vod_duration: e.time,
            ext: {
                id: `${e.id}`,
            },
        })
    })

    return jsonify({
        list: cards,
    })
}
