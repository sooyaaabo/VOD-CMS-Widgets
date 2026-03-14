// 引用链接: https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/Widgets/HotPicks.js
var WidgetMetadata = {
  id: "hot_picks",
  title: "热门精选",
  description: "获取最新热门影片推荐",
  author: "两块",
  site: "https://github.com/2kuai/ForwardWidgets",
  version: "1.5.8",
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
    },
    {
      title: "动漫推荐",
      functionName: "getAnimation",
      cacheDuration: 43200,
      params: [
        {
          name: "sort_by",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "番剧", value: "anime" },
            { title: "国创", value: "donghua" }
          ]
        }
      ]
    },
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
            { title: "热度最高", value: "popularity" },
            { title: "发布时间", value: "time" },
            { title: "评分最高", value: "rating" }
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
            { title: "热度最高", value: "popularity" },
            { title: "发布时间", value: "time" },
            { title: "评分最高", value: "rating" }
          ]
        }
      ]
    }
  ]
};

const Utils = {
  emptyTips: [{ id: "empty", type: "text", title: "⚠️ 加载失败", description: "请检查网络或配置 GitHub 加速" }],

  async fetch(proxy, path) {
    const url = `${proxy || ""}https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/${path}`;
    try {
      const resp = await Widget.http.get(url);
      if (!resp?.data) return this.emptyTips;
      return resp.data;
    } catch (e) {
      console.error(`[Error] ${url}: ${e.message}`);
      return this.emptyTips;
    }
  },

  sortList(list, sortBy) {
    if (!list || !Array.isArray(list) || list.length === 0 || list[0].id === "empty") {
      return list || [];
    }
    
    if (!sortBy || sortBy === "default") return list;

    return [...list].sort((a, b) => {
      const valA = a[sortBy] || 0;
      const valB = b[sortBy] || 0;

      switch (sortBy) {
        case "rating":
        case "popularity":
          return parseFloat(valB) - parseFloat(valA);
        case "time":
          return (b.releaseDate ? new Date(b.releaseDate) : 0) - (a.releaseDate ? new Date(a.releaseDate) : 0);
        default:
          return 0;
      }
    });
  },
};

/**
 * 实时榜单
 */
async function getTVRanking(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "maoyan-data.json");
  const list = data?.[params.seriesType]?.[params.sort_by] || [];
  return list;
}

/**
 * 悬疑剧场
 */
async function getSuspenseTheater(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "theater-data.json");
  if (!data) return Utils.emptyTips;
    
  const section = params.status;
  let list = params.platformId === "all" 
    ? Object.keys(data).filter(k => k !== "last_updated").flatMap(k => data[k]?.[section] || []) 
    : (data[params.platformId]?.[section] || []);
  
  return Utils.sortList(list, params.sort_by);
}

/**
 * 院线电影
 */
async function getMovies(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "douban_movie_data.json");
  if (!data) return Utils.emptyTips;
  const list = data?.[params.sort] || [];
  return Utils.sortList(list, params.sort_by);
}

/**
 * 电影推荐
 */
async function getHotMovies(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "dbmovie-data.json");
  const list = data?.[params.sort_by] || [];
  return list;
}

/**
 * 剧集推荐
 */
async function getHotTv(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "dbtv-data.json");
  const list = data?.[params.sort_by] || [];
  return list;
}

/**
 * 动漫推荐
 */
async function getAnimation(params = {}) {
  const data = await Utils.fetch(params.githubProxy, "bilibili_animation_data.json");
  const list = data?.[params.sort_by] || [];
  return list;
}

