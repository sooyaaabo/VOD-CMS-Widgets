// 引用链接: https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/Widgets/HotPicks.js
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

var WidgetMetadata = {
  id: "hot_picks",
  title: "热门精选",
  description: "获取最新热门影片推荐",
  author: "两块",
  site: "https://github.com/2kuai/ForwardWidgets",
  version: "1.2.0",
  requiredVersion: "0.0.1",
  globalParams: [
    {
      name: "TMDB_API_KEY",
      title: "TMDB API 访问密钥",
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
      title: "豆瓣片单",
      description: "豆瓣片单地址",
      requiresWebView: false,
      functionName: "getDoulist",
      params: [
        {
          name: "url",
          title: "类型",
          type: "input",
          cacheDuration: 10800,
          description: "豆瓣片单地址",
          placeholders: [
            { title: "高分韩剧", value: "2942804" },
            { title: "惊悚恐怖片", value: "526461" },
            { title: "一周电影口碑榜", value: "movie_weekly_best" }
          ]
        },
      ]
    },
    {
      title: "观影偏好",
      description: "根据个人偏好推荐影视作品",
      requiresWebView: false,
      functionName: "getPreferenceRecommendations",
      cacheDuration: 10800,
      params: [
        {
          name: "mediaType",
          title: "类别",
          type: "enumeration",
          enumOptions: [
            { title: "剧集", value: "tv" },
            { title: "电影", value: "movie" }
          ]
        },
        {
          name: "genre",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "全部", value: "" },
            { title: "喜剧", value: "喜剧" },
            { title: "爱情", value: "爱情" },
            { title: "动作", value: "动作" },
            { title: "科幻", value: "科幻" },
            { title: "动画", value: "动画" },
            { title: "悬疑", value: "悬疑" },
            { title: "犯罪", value: "犯罪" },
            { title: "音乐", value: "音乐" },
            { title: "历史", value: "历史" },
            { title: "奇幻", value: "奇幻" },
            { title: "恐怖", value: "恐怖" },
            { title: "战争", value: "战争" },
            { title: "西部", value: "西部" },
            { title: "歌舞", value: "歌舞" },
            { title: "传记", value: "传记" },
            { title: "武侠", value: "武侠" },
            { title: "纪录片", value: "纪录片" },
            { title: "短片", value: "短片" },
            
          ]
        },
        {
          name: "region",
          title: "地区",
          type: "enumeration",
          enumOptions: [
            { title: "全部地区", value: "" },
            { title: "华语", value: "华语" },
            { title: "欧美", value: "欧美" },
            { title: "韩国", value: "韩国" },
            { title: "日本", value: "日本" },
            { title: "中国大陆", value: "中国大陆" },
            { title: "中国香港", value: "中国香港" },
            { title: "中国台湾", value: "中国台湾" },
            { title: "美国", value: "美国" },
            { title: "英国", value: "英国" },
            { title: "法国", value: "法国" },
            { title: "德国", value: "德国" },
            { title: "意大利", value: "意大利" },
            { title: "西班牙", value: "西班牙" },
            { title: "印度", value: "印度" },
            { title: "泰国", value: "泰国" }
          ]
        },
        {
          name: "year",
          title: "年份",
          type: "enumeration",
          enumOptions: [
            { title: "全部年份", value: "" },
            { title: "2025", value: "2025" },
            { title: "2024", value: "2024" },
            { title: "2023", value: "2023" },
            { title: "2022", value: "2022" },
            { title: "2021", value: "2021" },
            { title: "2020年代", value: "2020年代" },
            { title: "2010年代", value: "2010年代" },
            { title: "2000年代", value: "2000年代" }

          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          enumOptions: [
            { title: "综合排序", value: "T" },
            { title: "近期热度", value: "U" },
            { title: "首映时间", value: "R" },
            { title: "高分优选", value: "S" }
          ]
        },
        {
          name: "tags",
          title: "标签",
          type: "input",
          description: "设置自定义标签，例如：丧尸"  
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



async function getDoulist(params = {}) {
  try {
    const url = params.url;
    if (!url) {
      console.error("缺少片单 URL");
      throw new Error("缺少片单 URL");
    }

    // 首先尝试从 GitHub 数据源获取片单数据
    const response = await Widget.http.get('https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/doulist-data.json', {
      headers: {
        "User-Agent": USER_AGENT
      }
    });
    
    if (!response?.data) throw new Error("获取片单数据失败");
    
    // 检查是否存在对应 URL 的片单数据
    if (response.data[url] && response.data[url].shows) {
      const results = response.data[url].shows;
      console.log(`从缓存数据源获取片单成功，共 ${results.length} 个项目`);
      
      if (!results.length) throw new Error("没有更多数据");
      
      return results;
    }
    
    // 如果没有对应的缓存数据，则根据 URL 类型调用相应的加载方法
    if (url.includes("douban.com/doulist/")) {
      return await loadDefaultList(params);
    } else if (url.includes("douban.com/subject_collection/")) {
      return await loadSubjectCollection(params);
    } else {
      console.error("不支持的 URL 类型");
      throw new Error("不支持的 URL 类型");
    }
    
  } catch (error) {
    console.error(`[片单列表] 获取失败: ${error.message}`);
    throw error;
  }
}



async function loadDefaultList(params = {}) {
  const url = params.url;
  // 提取片单 ID
  const listId = url.match(/doulist\/(\d+)/)?.[1];
  console.debug("片单 ID:", listId);
  if (!listId) {
    console.error("无法获取片单 ID");
    throw new Error("无法获取片单 ID");
  }

  const start = params.start || 0;
  const limit = params.limit || 20;
  //        // 构建片单页面 URL
  const pageUrl = `https://www.douban.com/doulist/${listId}/?start=${start}&limit=${limit}`;

  console.log("请求片单页面:", pageUrl);
  // 发送请求获取片单页面
  const response = await Widget.http.get(pageUrl, {
    headers: {
      Referer: `https://movie.douban.com/explore`,
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  if (!response || !response.data) {
    throw new Error("获取片单数据失败");
  }

  console.log("片单页面数据长度:", response.data.length);
  console.log("开始解析");

  // 解析 HTML 得到文档 ID
  const docId = Widget.dom.parse(response.data);
  if (docId < 0) {
    throw new Error("解析 HTML 失败");
  }
  console.log("解析成功:", docId);

  //        // 获取所有视频项，得到元素ID数组
  const videoElementIds = Widget.dom.select(docId, ".doulist-item .title a");

  console.log("items:", videoElementIds);

  let doubanIds = [];
  for (const itemId of videoElementIds) {
    const link = await Widget.dom.attr(itemId, "href");
    const id = link.match(/subject\/(\d+)/)?.[1];
    if (id) {
      doubanIds.push({ id: id, type: "douban" });
    }
  }

  return doubanIds;
}


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

// 观影偏好
async function getPreferenceRecommendations(params = {}) {
    try {
        const rating = params.rating || "0";
        if (!/^\d$/.test(String(rating))) throw new Error("评分必须为 0～9 的整数");

        const selectedCategories = {
            "类型": params.genre || "",
            "地区": params.region || ""
        };

        const tags_sub = [];
        if (params.genre) tags_sub.push(params.genre);
        if (params.region) tags_sub.push(params.region);
        if (params.year) {
            if (params.year.includes("年代")) {
                tags_sub.push(params.year);
            } else {
                tags_sub.push(`${params.year}年`);
            }
        }
        if (params.tags) {
            const customTagsArray = params.tags.split(',').filter(tag => tag.trim() !== '');
            tags_sub.push(...customTagsArray);
        }

        const limit = 20;
        const offset = Number(params.offset);
        const url = `https://m.douban.com/rexxar/api/v2/${params.mediaType}/recommend?refresh=0&start=${offset}&count=${Number(offset) + limit}&selected_categories=${encodeURIComponent(JSON.stringify(selectedCategories))}&uncollect=false&score_range=${rating},10&tags=${encodeURIComponent(tags_sub.join(","))}&sort=${params.sort_by}`;

        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": USER_AGENT,
                "Referer": "https://movie.douban.com/explore"
            }
        });

        if (!response.data?.items?.length) throw new Error("未找到匹配的影视作品");

        const validItems = response.data.items.filter(item => item.card === "subject");

        if (!validItems.length) throw new Error("未找到有效的影视作品");
        
            return await Promise.all(validItems.map(async item => {
                return await getTmdbDetail(item.title, params.mediaType, params.TMDB_API_KEY);
            }));

    } catch (error) {
        throw error;
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

      // 如果存在 USER_AGENT，也添加到 Header
      if (typeof USER_AGENT !== 'undefined') {
        headers["User-Agent"] = USER_AGENT;
      }

      response = await Widget.http.get(searchUrl, { 
        params: params,
        headers: headers
      });
      
      // 检查 API 响应状态
      if (response?.status === 401) {
        throw new Error("TMDB API Key 无效");
      }
      
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
      console.log(`[TMDB] 使用内置查询: ${cleanTitle}`);
    }

    if (!response?.data?.results?.length) {
      console.log(`[TMDB] 无返回数据`);
      return null;
    }

    const results = response.data.results;

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

// 使用示例：
// 1. 如果 params.TMDB_API_KEY 存在，则使用 API 查询
// 2. 如果 params.TMDB_API_KEY 不存在，则使用内置查询
// await getTmdbDetail("阿凡达（2019）", "movie");
