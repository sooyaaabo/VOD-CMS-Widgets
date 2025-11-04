// 引用链接: https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/Widgets/HotPicks.js
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

var WidgetMetadata = {
  id: "hot_picks",
  title: "热门精选",
  description: "获取最新热门影片推荐",
  author: "两块",
  site: "https://github.com/2kuai/ForwardWidgets",
  version: "1.2.1",
  requiredVersion: "0.0.1",
  globalParams: [
    {
      name: "TMDB_API_KEY",
      title: "TMDB API 访问令牌",
      type: "input"
    },
  ],
  modules: [
    {
      title: "实时榜单",
      description: "实时热播剧榜单",
      requiresWebView: false,
      functionName: "getTVRanking",
      params: [
        {
          name: "seriesType",
          title: "类型",
          type: "enumeration",
          cacheDuration: 10800,
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
            { title: "乐视视频", value: "乐视视频" },
            { title: "搜狐视频", value: "搜狐视频" },
            { title: "PPTV", value: "PPTV" },
            { title: "芒果TV", value: "芒果TV" }
          ]
        }
      ]
    },
    {
        title: "悬疑剧场",
        description: "获取悬疑剧场剧集信息",
        requiresWebView: false,
        functionName: "getSuspenseTheater",
        cacheDuration: 86400,
        params: [
        {
            name: "status",
            title: "类别",
            type: "enumeration",
            description: "选择剧集上映时间",
            enumOptions: [
                { title: "正在热播", value: "now_playing" },
                { title: "即将上线", value: "coming_soon" }
            ]
        },
        {
            name: "type",
            title: "类型",
            type: "enumeration",
            description: "选择要查看的剧场类型",
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
      description: "获取正在上映或即将上映的电影列表",
      requiresWebView: false,
      functionName: "getMovies",
      cacheDuration: 43200,
      params: [
        {
          name: "sort",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "正在热映", value: "nowplaying" },
            { title: "即将上映", value: "coming" },
            { title: "经典影片", value: "classics" },
            { title: "年度电影", value: "yearly2025" }  
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

// 实时榜单
async function getTVRanking(params = {}) {
    try {       
        const response = await Widget.http.get(`https://raw.githubusercontent.com/2kuai/ForwardWidgets/refs/heads/main/data/maoyan-data.json`, {
            headers: {
                "User-Agent": USER_AGENT,
                "referer": "https://piaofang.maoyan.com/dashboard/web-heat"
            }
        });

        if (!response || !response.data) throw new Error("获取数据失败");
        if (!response.data[params.seriesType] || !response.data[params.seriesType][params.sort_by]) throw new Error("获取剧场失败");

        return response.data[params.seriesType][params.sort_by];

    } catch (error) {
        throw new Error(`获取榜单失败: ${error.message}`);
    }
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
        
        const limit = 20;
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

        // 添加错误处理，避免单个请求失败影响全部
        const tmdbDetails = await Promise.all(
            response.data.items.map(async item => {
                try {
                    return await getTmdbDetail(item.title, mediaType, params.TMDB_API_KEY);
                } catch (error) {
                    console.warn(`获取TMDB详情失败: ${item.title}`, error);
                    return null;
                }
            })
        );
        
        // 过滤掉null值
        return tmdbDetails.filter(detail => detail !== null);

    } catch (error) {
        console.error("获取豆瓣推荐失败:", error);
        return [];  // 返回空数组而不是抛出错误
    }
}

// 悬疑剧场
async function getSuspenseTheater(params = {}) {
  try {
    const response = await Widget.http.get(
      'https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/theater-data.json',
      {
        headers: {
          "User-Agent": USER_AGENT
        }
      }
    );
    
    if (!response?.data) {
      throw new Error("获取剧场数据失败");
    }
    
    const data = response.data;
    const type = params.type || "all"; // 默认全部剧场
    const status = params.status || "now_playing"; // 默认正在热播
    const sortBy = params.sort_by || "time"; // 默认按时间排序

    // 状态映射
    const statusMap = {
      "now_playing": "aired",
      "coming_soon": "upcoming"
    };
    const section = statusMap[status] || "aired";

    // 获取基础数据
    let results = [];
    if (type === "all") {
      const theaters = ["迷雾剧场", "白夜剧场", "季风剧场", "X剧场"];
      results = theaters.flatMap(theaterName => 
        data[theaterName]?.[section] || []
      );
    } else {
      if (!data[type]) {
        throw new Error(`未找到 ${type} 剧场数据`);
      }
      
      if (!data[type][section]) {
        throw new Error(`${type} 剧场中没有 ${status} 数据`);
      }
      
      results = data[type][section];
    }

    // 过滤无效数据
    const filteredResults = results.filter(item => item.posterPath != null);

    // 排序处理
    switch (sortBy) {
      case "time":
        return filteredResults.sort((a, b) => 
          new Date(b.releaseDate) - new Date(a.releaseDate)
        );
      case "rating":
        return filteredResults.sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
      default:
        return filteredResults;
    }
    
  } catch (error) {
    console.error(`获取剧场数据失败: ${error.message}`);
    throw error;
  }
}


// 院线电影
async function getMovies(params = {}) {
  try {
    const type = params.sort;
    const sortBy = params.sort_by; // 获取排序方式

    const response = await Widget.http.get('https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/movies-data.json', {
      headers: {
        "User-Agent": USER_AGENT
      }
    });
    
    if (!response?.data) throw new Error("获取院线数据失败");
    
    let results = response.data[type];
    
    if (!results?.length) throw new Error("没有更多数据");
    
    // 过滤掉没有海报的数据
    results = results.filter(item => item.posterPath != null);
    
    // 根据 sort_by 参数排序
    if (sortBy === 'time') {
      results.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortBy === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    return results;
  } catch (error) {
    console.error(`[电影列表] 获取失败: ${error.message}`);
    throw error;
  }
}


// 通用剧名查询，例如：await getTmdbDetail("阿凡达（2019）", "movie")
const getTmdbDetail = async (title, mediaType, key, options = {}) => {
  if (!title?.trim() || !['tv', 'movie'].includes(mediaType)) {
    console.error(`[TMDB] 参数错误: mediaType 必须为 'tv' 或 'movie'`);
    return null;
  }

  const { language = "zh-CN" } = options;
  const apiKey = key; // 从 params.TMDB_API_KEY 获取 API Key
  
  const yearMatch = title.match(/\b(19|20)\d{2}\b/)?.[0];

  const cleanTitle = title
    .replace(/([（(][^）)]*[)）])/g, '') // 移除中文括号及内容
    .replace(/剧场版|特别篇|动态漫|中文配音|中配|粤语版|国语版/g, '') // 移除不需要的部分
    .replace(/第[0-9一二三四五六七八九十]+季/g, '') // 移除季信息
    .trim();

  try {
    let response;
    let responseData; // 统一存储响应数据
    
    // 如果存在 API Key，使用 API 查询
    if (apiKey) {
      const searchUrl = `https://api.themoviedb.org/3/search/${mediaType}`;
      const params = {
        query: cleanTitle,
        language: language,
        include_adult: false
      };

      if (yearMatch) {
        params.year = yearMatch;
      }

      // 将 API Key 放在 Header 中
      const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json;charset=utf-8"
      };

      response = await Widget.http.get(searchUrl, { 
        params: params,
        headers: headers
      });
      
      // API Key 查询返回的是 response.data
      responseData = response.data;
      console.log(`[TMDB] 使用 API Key 查询: ${cleanTitle}`);
    } else {
      // 没有 API Key，使用内置查询
      const params = {
        query: cleanTitle,
        language: language
      };

      if (yearMatch) {
        params.year = yearMatch;
      }

      response = await Widget.tmdb.get(`/search/${mediaType}`, {params});
      // 系统内置查询返回的是 response 本身
      responseData = response;
      console.log(`[TMDB] 使用内置查询: ${cleanTitle}`);
    }

    // 统一使用 responseData 来处理结果
    if (!responseData?.results?.length) {
      console.log(`[TMDB] 无返回数据`);
      return null;
    }

    const results = responseData.results;

    // 精确匹配逻辑
    const exactMatch = results.find(
      item => 
        (item.name === cleanTitle || item.title === cleanTitle) ||
        (item.original_name === cleanTitle || item.original_title === cleanTitle)
    );

    const matchedItem = exactMatch || results[0];
    return formatTmdbResult(matchedItem, mediaType);
  } catch (error) {
    console.error(`[TMDB] 请求失败: ${error.message}`);
    return null;
  }
};


// 辅助函数：格式化 TMDB 返回的结果
const formatTmdbResult = (item, mediaType) => ({
  id: item.id,
  type: "tmdb",
  title: item.name ?? item.title,
  description: item.overview,
  posterPath: item.poster_path,
  backdropPath: item.backdrop_path,
  releaseDate: item.first_air_date ?? item.release_date,
  rating: item.vote_average,
  mediaType: mediaType
});