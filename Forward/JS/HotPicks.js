// 引用链接: https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/Widgets/HotPicks.js
var WidgetMetadata = {
  id: "hot_picks",
  title: "热门精选",
  description: "获取最新热门影片推荐",
  author: "两块",
  site: "https://github.com/2kuai/ForwardWidgets",
  version: "1.5.37",
  requiredVersion: "0.0.1",
  globalParams: [
    {
      name: "githubProxy",
      title: "GitHub 加速源",
      type: "input",
      placeholders: [
        { title: "ghproxy", value: "https://ghproxy.net/" }
      ]
    }
  ],
  modules: [
    {
      title: "实时榜单",
      functionName: "getTVRanking",
      params: [
        {
          name: "seriesType",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "剧集", value: "tv" },
            { title: "综艺", value: "show" }
          ]
        },
        {
          name: "sort_by",
          title: "平台",
          type: "enumeration",
          enumOptions: [
            { title: "全网", value: "全网" },
            { title: "优酷", value: "优酷" },
            { title: "爱奇艺", value: "爱奇艺" },
            { title: "腾讯视频", value: "腾讯视频" },
            { title: "芒果TV", value: "芒果TV" }
          ]
        }
      ]
    },
    {
      title: "悬疑剧场",
      functionName: "getSuspenseTheater",
      params: [
        {
          name: "status",
          title: "类别",
          type: "enumeration",
          enumOptions: [
            { title: "正在热播", value: "aired" },
            { title: "即将上线", value: "upcoming" }
          ]
        },
        {
          name: "platformId",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "全部剧场", value: "all" },
            { title: "迷雾剧场", value: "迷雾剧场" },
            { title: "白夜剧场", value: "白夜剧场" },
            { title: "季风剧场", value: "季风剧场" },
            { title: "X剧场", value: "X剧场" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "按时间", value: "time" },
            { title: "按评分", value: "rating" }
          ]
        }
      ]
    },
    {
      title: "院线电影",
      functionName: "getMovies",
      params: [
        {
          name: "sort",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "正在热映", value: "now_playing" },
            { title: "即将上映", value: "coming_soon" },
            { title: "经典影片", value: "top250" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "按时间", value: "time" },
            { title: "按评分", value: "rating" }
          ]
        }
      ]
    },
    {
      title: "电影推荐",
      description: "最近热门电影推荐",
      requiresWebView: false,
      functionName: "getHotMovies",
      cacheDuration: 3600,
      params: [
        {
          name: "category",
          title: "类别",
          type: "enumeration",
          enumOptions: [
            { title: "热门电影", value: "" },
            { title: "最新电影", value: "最新" },
            { title: "豆瓣高分", value: "豆瓣高分" },
            { title: "冷门佳片", value: "冷门佳片" }
          ]
        },
        {
          name: "sort_by",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "全部电影", value: "全部" },
            { title: "华语电影", value: "华语" },
            { title: "欧美电影", value: "欧美" },
            { title: "韩国电影", value: "韩国" },
            { title: "日本电影", value: "日本" }
          ]
        },
        {
          name: "rating",
          title: "评分",
          type: "input",
          description: "设置最低评分过滤，例如：6"
        },
        {
          name: "offset",
          title: "起始位置",
          type: "offset"
        }
      ]
    },
    {
      title: "剧集推荐",
      description: "最近热门剧集推荐",
      requiresWebView: false,
      functionName: "getHotTv",
      cacheDuration: 3600,
      params: [
        {
          name: "sort_by",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "全部剧集", value: "tv" },
            { title: "国产剧", value: "tv_domestic" },
            { title: "欧美剧", value: "tv_american" },
            { title: "日剧", value: "tv_japanese" },
            { title: "韩剧", value: "tv_korean" },
            { title: "动画", value: "tv_animation" },
            { title: "纪录片", value: "tv_documentary" },
            { title: "国内综艺", value: "show_domestic" },
            { title: "国外综艺", value: "show_foreign" }
          ]
        },
        {
          name: "rating",
          title: "评分",
          type: "input",
          description: "设置最低评分过滤，例如：6"
        },
        {
          name: "offset",
          title: "起始位置",
          type: "offset"
        }
      ]
    }
  ]
};

// --- 工具类 ---
const Utils = {
  async fetch(url, options = {}) {
    try {
      const resp = await Widget.http.get(url, { 
        headers: { "User-Agent": USER_AGENT, ...options.headers }, 
        ...options 
      });
      return resp?.data;
    } catch (e) {
      console.error(`[Fetch Error] ${url}: ${e.message}`);
      return null;
    }
  },
  cleanTitle(title) {
    if (!title) return "";
    return title.replace(/([（(][^）)]*[)）])/g, '').replace(/剧场版|特别篇|动态漫|中文配音|中配|粤语版|国语版/g, '').replace(/第[0-9一二三四五六七八九十]+季/g, '').trim();
  }
};

const GENRE_MAP = {
    28: "动作", 12: "冒险", 16: "动画", 35: "喜剧", 80: "犯罪", 99: "纪录片", 18: "剧情", 10751: "家庭", 14: "奇幻", 36: "历史", 27: "恐怖", 10402: "音乐", 9648: "悬疑", 10749: "爱情", 878: "科幻", 10770: "电视电影", 53: "惊悚", 10752: "战争", 37: "西部", 10759: "动作冒险", 10762: "儿童", 10763: "新闻", 10764: "真人秀", 10765: "科幻奇幻", 10766: "肥皂剧", 10767: "脱口秀", 10768: "战争政治"
};
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";


// 实时榜单
async function getTVRanking(params = {}) {
  const proxy = params.githubProxy || "";
  const data = await Utils.fetch(`${proxy}https://raw.githubusercontent.com/2kuai/ForwardWidgets/refs/heads/main/data/maoyan-data.json`);
  if (!data) return [];
  let list = (data[params.seriesType]?.[params.sort_by] || []);
  return list;
}

// 悬疑剧场
async function getSuspenseTheater(params = {}) {
  const proxy = params.githubProxy || "";
  const data = await Utils.fetch(`${proxy}https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/theater-data.json`);
  if (!data) return [];
  const section = params.status; 
  const theaterKeys = Object.keys(data).filter(key => key !== "last_updated");
  let list = params.platformId === "all" 
    ? theaterKeys.flatMap(k => data[k]?.[section] || []) 
    : (data[params.platformId]?.[section] || []);
  list.sort((a, b) => {
    if (params.sort_by === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
    }
  });
  return list;
}

// 院线电影
async function getMovies(params = {}) {
  const proxy = params.githubProxy || "";
  const data = await Utils.fetch(`${proxy}https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/movies-data.json`);
  if (!data) return [];
  let list = (data[params.sort] || []).filter(i => i.posterPath);
  list.sort((a, b) => {
    if (params.sort_by === "rating") {
      return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    } else {
      return new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0);
    }
  });
  return list;
}

// 电影推荐
async function getHotMovies(params = {}) {
    return getDoubanRecs(params, 'movie');
}
// 剧集推荐
async function getHotTv(params = {}) {
    return getDoubanRecs(params, 'tv');
}
// 处理豆瓣推荐
async function getDoubanRecs(params = {}, mediaType) {
    try {
        const rating = params.rating || "0";
        if (!/^\d$/.test(String(rating))) throw new Error("评分必须为 0～9 的整数");
        
        const limit = 15;
        const offset = Number(params.offset) || 0;  // 添加默认值
        const category = params.category != null ? params.category : "tv";        
        const url = `https://m.douban.com/rexxar/api/v2/subject/recent_hot/${mediaType}?start=${offset}&limit=${limit}&category=${category}&type=${params.sort_by}&score_range=${rating},10`;
        
        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": USER_AGENT,
                "Referer": "https://movie.douban.com/"  // 修正Referer
            }
        });

        if (!response.data?.items?.length) {
            return [];  // 返回空数组而不是抛出错误
        }

        const tmdbDetails = [];
        for (const item of response.data.items) {
            const cacheKey = `dbid_${mediaType}_${item.id}`;
            const cachedData = Widget.storage.get(cacheKey);
            if (cachedData) {
                tmdbDetails.push(JSON.parse(cachedData));
                continue;
            }
            const detail = await getTmdbDetail(item.title, mediaType);
            if (detail) {
                tmdbDetails.push(detail);
                Widget.storage.set(cacheKey, JSON.stringify(detail));
            }
        }
        return tmdbDetails;
    } catch (error) {
        console.error("获取豆瓣推荐失败:", error);
        return [];  // 返回空数组而不是抛出错误
    }
}
async function getTmdbDetail(title, mediaType) {
  if (!title) return null;
  const cleanTitle = Utils.cleanTitle(title);
  try {
    const resp = await Widget.tmdb.get(`/search/${mediaType}`, { params: { query: cleanTitle, language: "zh-CN" } });
    if (!resp?.results?.length) return null;
    const matchedItem = resp.results[0];
    return {
      id: matchedItem.id,
      type: "tmdb",
      title: matchedItem.name || matchedItem.title,
      description: matchedItem.overview,
      posterPath: matchedItem.poster_path,
      backdropPath: matchedItem.backdrop_path,
      releaseDate: matchedItem.first_air_date || matchedItem.release_date,
      rating: matchedItem.vote_average,
      genreTitle: matchedItem.genre_ids.map(id => GENRE_MAP[id]).filter(Boolean).join(','),
      mediaType: mediaType
    };
  } catch (e) { return null; }
}
