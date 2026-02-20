// 引用链接: https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/Widgets/HotPicks.js
var WidgetMetadata = {
  id: "hot_picks",
  title: "热门精选",
  description: "获取最新热门影片推荐",
  author: "两块",
  site: "https://github.com/2kuai/ForwardWidgets",
  version: "1.5.7",
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
      cacheDuration: 3600,
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
      cacheDuration: 43200,
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
          title: "剧场",
          type: "enumeration",
          enumOptions: [
            { title: "全部剧场", value: "all" },
            { title: "迷雾剧场", value: "迷雾剧场" },
            { title: "白夜剧场", value: "白夜剧场" },
            { title: "X剧场", value: "X剧场" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "排序", value: "default" },
            { title: "按热度", value: "popularity" },
            { title: "按时间", value: "time" },
            { title: "按评分", value: "rating" }
          ]
        }
      ]
    },
    {
      title: "院线电影",
      functionName: "getMovies",
      cacheDuration: 43200,
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
            { title: "排序", value: "default" },
            { title: "按热度", value: "popularity" },
            { title: "按时间", value: "time" },
            { title: "按评分", value: "rating" }
          ]
        }
      ]
    },
    {
      title: "电影推荐",
      functionName: "getHotMovies",
      cacheDuration: 43200,
      params: [
        {
          name: "sort_by",
          title: "地区",
          type: "enumeration",
          enumOptions: [
            { title: "全部", value: "全部" },
            { title: "华语", value: "华语" },
            { title: "欧美", value: "欧美" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" }
          ]
        }
      ]
    },
    {
      title: "剧集推荐",
      functionName: "getHotTv",
      cacheDuration: 43200,
      params: [
        {
          name: "sort_by",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "全部", value: "tv" },
            { title: "国产剧", value: "tv_domestic" },
            { title: "欧美剧", value: "tv_american" },
            { title: "日剧", value: "tv_japanese" },
            { title: "韩剧", value: "tv_korean" },
            { title: "动画", value: "tv_animation" },
            { title: "纪录片", value: "tv_documentary" },
            { title: "国内综艺", value: "show_domestic" },
            { title: "国外综艺", value: "show_foreign" }
          ]
        }
      ]
    }
  ]
};

// --- 工具类 ---
const Utils = {
  emptyTips: [{ id: "empty", type: "text", title: "⚠️ 请尝试刷新数据", description: "" }],

  async fetch(proxy, path) {
    const url = `${proxy || ""}${path}`;
    try {
      const resp = await Widget.http.get(url);
      return resp?.data || null;
    } catch (e) {
      console.error(`[Fetch Error] ${url}: ${e.message}`);
      return null;
    }
  },

   sortList(list, sortBy) {
    if (!list || !Array.isArray(list) || list.length === 0) return [];
    
    if (!sortBy || sortBy === "default") {
      return list;
    }

    return [...list].sort((a, b) => {
      if (sortBy === "rating") {
        return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      }
      if (sortBy === "popularity") {
        return (parseFloat(b.popularity) || 0) - (parseFloat(a.popularity) || 0);
      }
      if (sortBy === "time") {
        const dateA = a.releaseDate ? new Date(a.releaseDate) : 0;
        const dateB = b.releaseDate ? new Date(b.releaseDate) : 0;
        return dateB - dateA;
      }
      return 0;
    });
  },

  // 结果检查：为空则返回统一提示
  checkResult(list) {
    return (list && Array.isArray(list) && list.length > 0) ? list : this.emptyTips;
  }
};

// --- 模块函数 ---
/**
 * 实时榜单
 */
async function getTVRanking(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "https://raw.githubusercontent.com/2kuai/ForwardWidgets/refs/heads/main/data/maoyan-data.json");
  const list = data?.[params.seriesType]?.[params.sort_by] || [];
  return Utils.checkResult(list);
}

/**
 * 悬疑剧场
 */
async function getSuspenseTheater(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/theater-data.json");
  if (!data) return Utils.emptyTips;
    
  const section = params.status;
  let list = params.platformId === "all" 
    ? Object.keys(data).filter(k => k !== "last_updated").flatMap(k => data[k]?.[section] || []) 
    : (data[params.platformId]?.[section] || []);
  
  return Utils.checkResult(Utils.sortList(list, params.sort_by));
}

/**
 * 院线电影
 */
async function getMovies(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/movies-data.json");
  if (!data) return Utils.emptyTips;
  
  const list = (data[params.sort] || []).filter(i => i.posterPath);
  return Utils.checkResult(Utils.sortList(list, params.sort_by));
}

/**
 * 电影推荐
 */
async function getHotMovies(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "https://raw.githubusercontent.com/2kuai/ForwardWidgets/refs/heads/main/data/dbmovie-data.json");
  const list = data?.[params.sort_by] || [];
  return Utils.checkResult(list);
}

/**
 * 剧集推荐
 */
async function getHotTv(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "https://raw.githubusercontent.com/2kuai/ForwardWidgets/refs/heads/main/data/dbtv-data.json");
  const list = data?.[params.sort_by] || [];
  return Utils.checkResult(list);
}
