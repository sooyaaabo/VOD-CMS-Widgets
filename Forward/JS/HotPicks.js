// 引用链接: https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/Widgets/HotPicks.js
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

var WidgetMetadata = {
  id: "hot_picks",
  title: "热门精选",
  description: "获取最新热门影片推荐",
  author: "两块",
  site: "https://github.com/2kuai/ForwardWidgets",
  version: "1.1.8",
  requiredVersion: "0.0.1",
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
      title: "观影偏好",
      description: "根据个人偏好推荐影视作品",
      requiresWebView: false,
      functionName: "getPreferenceRecommendations",
      cacheDuration: 10800,
      params: [
        {
          name: "source",
          title: "来源",
          type: "enumeration",
          enumOptions: [
            { title: "豆瓣", value: "douban" },
            { title: "TMDB", value: "tmdb" }
          ]
        },
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
          name: "source",
          title: "来源",
          type: "enumeration",
          enumOptions: [
            { title: "豆瓣", value: "douban" },
            { title: "TMDB", value: "tmdb" }
          ]
        },
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
          name: "source",
          title: "来源",
          type: "enumeration",
          enumOptions: [
            { title: "豆瓣", value: "douban" },
            { title: "TMDB", value: "tmdb" }
          ]
        },
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
    },
    {
        title: "悬疑剧场",
        description: "获取悬疑剧场剧集信息",
        requiresWebView: false,
        functionName: "getSuspenseTheater",
        cacheDuration: 86400,
        params: [
        {
            name: "type",
            title: "类别",
            type: "enumeration",
            description: "选择剧集上映时间",
            enumOptions: [
                { title: "正在热播", value: "now_playing" },
                { title: "即将上线", value: "coming_soon" }
            ]
        },
        {
            name: "sort_by",
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
          name: "sort_by",
          title: "类型",
          type: "enumeration",
          enumOptions: [
            { title: "正在上映", value: "nowplaying" },
            { title: "即将上映", value: "coming" },
            { title: "经典影片", value: "classics" }
          ]
        }
      ]
    },
    {
      title: "本周榜单",
      description: "获取豆瓣本周榜单",
      requiresWebView: false,
      functionName: "getDoubanWeekly",
      cacheDuration: 10800,
      params: [
        {
          name: "sort_by",
          title: "榜单类型",
          type: "enumeration",
          enumOptions: [
            { title: "一周口碑电影榜", value: "movie_weekly_best" },
            { title: "华语口碑剧集榜", value: "tv_chinese_best_weekly" },
            { title: "全球口碑剧集榜", value: "tv_global_best_weekly" },
            { title: "国内口碑综艺榜", value: "show_chinese_best_weekly" },
            { title: "国外口碑综艺榜", value: "show_global_best_weekly" }
          ]
        }
      ]
    },
    {
      title: "年度榜单",
      description: "获取豆瓣年度榜单",
      requiresWebView: false,
      functionName: "getDouban2024",
      cacheDuration: 86400,
      params: [
        {
          name: "id",
          title: "榜单",
          type: "enumeration",
          enumOptions: [
            { title: "评分最高华语电影", value: "478" },
            { title: "评分最高外语电影", value: "528" },
            { title: "年度冷门佳片", value: "529" },
            { title: "评分最高华语剧集", value: "545" },
            { title: "评分最高英美新剧", value: "547" },
            { title: "评分最高英美续订剧", value: "546" },
            { title: "最值得期待华语电影", value: "559" },
            { title: "最值得期待外语电影", value: "560" },
            { title: "最值得期待剧集", value: "561" },
            { title: "地区&类型电影", value: "563" },
            { title: "上映周年电影", value: "565" }
          ]
        },
        {
          name: "sub_id",
          title: "分类",
          type: "enumeration",
          belongTo: {
            paramName: "id",
            value: ["563"]
          },
          enumOptions: [
            { title: "评分最高日本电影", value: "16065" },
            { title: "评分最高韩国电影", value: "16066" },
            { title: "评分最高喜剧片", value: "16067" },
            { title: "评分最高爱情片", value: "16068" },
            { title: "评分最高恐怖片", value: "16069" },
            { title: "评分最高动画片", value: "16070" },
            { title: "评分最高纪录片", value: "16071" }
          ]
        },
        {
          name: "sub_id",
          title: "分类",
          type: "enumeration",
          description: "选择要查看的上映周年",
          belongTo: {
            paramName: "id",
            value: ["565"]
          },
          enumOptions: [
            { title: "上映10周年电影", value: "16080" },
            { title: "上映20周年电影", value: "16081" },
            { title: "上映30周年电影", value: "16082" },
            { title: "上映40周年电影", value: "16083" },
            { title: "上映50周年电影", value: "16084" }
          ]
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
        
        if (params.source === "douban") {
            return validItems.map(item => ({
                id: item.id,
                type: "douban",
                title: item.title,
                mediaType: params.mediaType
            }));
        } else {
            return await Promise.all(validItems.map(async item => {
                return await getTmdbDetail(item.title, params.mediaType);
            }));
        }

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
        
        const limit = 30;
        const offset = Number(params.offset);     
        const category = params.category != null ? params.category : "tv";        
        const url = `https://m.douban.com/rexxar/api/v2/subject/recent_hot/${mediaType}?start=${offset}&limit=${offset + limit}&category=${category}&type=${params.sort_by}&score_range=${rating},10`;
        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": USER_AGENT,
                "Referer": "https://movie.douban.com/explore"
            }
        });

        if (!response.data?.items?.length) throw new Error("数据格式不符合预期");

        if (params.source === "douban") {
            return response.data.items.map(item => ({
                id: item.id,
                type: "douban",
                title: item.title,
                mediaType: mediaType
            }));
        } else {
            const tmdbDetails = await Promise.all(response.data.items.map(async item => {
                return await getTmdbDetail(item.title, mediaType);
            }));
            // Filter out null values when source is tmdb
            return tmdbDetails.filter(detail => detail !== null);
        }

    } catch (error) {
        throw error;
    }
}

// 悬疑剧场
async function getSuspenseTheater(params = {}) {
  try {
    const tmdbIdBlocklist = [
      "76582"
    ]; // 在此数组中添加需要过滤的 TMDB ID

    const response = await Widget.http.get('https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/theater-data.json', {
      headers: {
        "User-Agent": USER_AGENT
      }
    });
    
    if (!response?.data) throw new Error("获取剧场数据失败");
    
    const data = response.data;
    const sortBy = params.sort_by || "all"; // 默认全部剧场
    const type = params.type || "now_playing"; // 默认正在热播

    const sectionMap = {
      "now_playing": "aired",
      "coming_soon": "upcoming"
    };
    const section = sectionMap[type] || "aired";

    let results = [];
    if (sortBy === "all") {
      for (const theaterName of ["迷雾剧场", "白夜剧场", "季风剧场", "X剧场"]) {
        if (data[theaterName]?.[section]) {
          results.push(...data[theaterName][section].map(item => ({
            ...item
          })));
        }
      }
      results.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else {
      if (!data[sortBy]) throw new Error(`未找到 ${sortBy} 数据`);
      if (!data[sortBy][section]) throw new Error(`${sortBy} 中没有 ${type} 数据`);
      
      results = data[sortBy][section];
    }

    return results.filter(item => 
      !(tmdbIdBlocklist.includes(String(item.id)) || item.posterPath == null)
    );

    
  } catch (error) {
    console.error(`获取剧场数据失败: ${error.message}`);
    throw error;
  }
}


// 院线电影
async function getMovies(params = {}) {
  try {
    const type = params.sort_by;

    const response = await Widget.http.get('https://raw.githubusercontent.com/2kuai/ForwardWidgets/main/data/movies-data.json', {
      headers: {
        "User-Agent": USER_AGENT
      }
    });
    
    if (!response?.data) throw new Error("获取院线数据失败");
    
    const results = response.data[type];
    
    if (!results.length) throw new Error("没有更多数据");
    
    return results.filter(item => item.posterPath != null);
  } catch (error) {
    console.error(`[电影列表] 获取失败: ${error.message}`);
    throw error;
  }
}

// 本周榜单
async function getDoubanWeekly(params = {}) {
  try {
    const url = `https://m.douban.com/rexxar/api/v2/subject_collection/${params.sort_by}/items?updated_at&items_only=1&type_tag&for_mobile=1`;
    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
        "referer": `https://m.douban.com/subject_collection/${params.type}/`
      }
    });
    
    if (!response.data?.subject_collection_items?.length) throw new Error("无返回数据");
    
    return response.data.subject_collection_items.map(item => ({
      id: item.id,
      type: "douban",
      title: item.title,
      posterPath: item.poster_path || "",
      backdropPath: item.cover_url,
      description: item.description|| "暂无描述",
      mediaType: item.type,
      link: `https://movie.douban.com/subject/${item.id}/`
    }));
  } catch (error) {
    console.error(`获取榜单数据失败: ${error.message}`);
    throw error;
  }
}

// 年度榜单
async function getDouban2024(options = {}) {
  try {
    
    const response = await Widget.http.get("https://movie.douban.com/j/neu/page/27/", {
      headers: {
        "User-Agent": USER_AGENT,
        "Referer": "https://movie.douban.com/annual/2024/?fullscreen=1&dt_from=movie_navigation"
      }
    });

    const matched = response.data.widgets?.find(widget => 
      String(widget.id) === String(options.id)
    );
    
    if (!matched?.source_data) throw new Error("未找到对应的榜单数据");

    const sourceData = matched.source_data;

    if (Array.isArray(sourceData) && options.sub_id) {
      const matchedGroup = sourceData.find(group => 
        String(group.subject_collection?.id) === String(options.sub_id)
      );

      if (!matchedGroup?.subject_collection_items?.length) {
        throw new Error("未找到匹配的子榜单数据");
      }

      return matchedGroup.subject_collection_items.map(item => ({
        id: item.id,
        type: "douban",
        title: item.title
      }));
    }

    if (!sourceData.subject_collection_items?.length) throw new Error("榜单数据为空");

    console.log('[电影年度数据] 成功获取数据');
    return sourceData.subject_collection_items.map(item => ({
      id: item.id,
      type: "douban",
      title: item.title,
      coverUrl: item.cover_url,
      rating: item.rating.value
    }));

  } catch (error) {
    console.error(`获取电影年度数据失败: ${error.message}`);
    throw error;
  }
}

// 通用剧名查询，例如：await getTmdbDetail("阿凡达（2019）", "movie")
const getTmdbDetail = async (title, mediaType) => {
  if (!title?.trim() || !['tv', 'movie'].includes(mediaType)) {
    console.error(`[TMDB] 参数错误: mediaType 必须为 'tv' 或 'movie'`);
    return null;
  }

  const yearMatch = title.match(/\b(19|20)\d{2}\b/)?.[0];

  const cleanTitle = title
    .replace(/([（(][^）)]*[)）])/g, '') // 移除中文括号及内容
    .replace(/剧场版|特别篇|动态漫|中文配音|中配|粤语版|国语版/g, '') // 移除不需要的部分
    .replace(/第[0-9一二三四五六七八九十]+季/g, '') // 移除季信息
    .trim();

  try {        
    const params = {
      query: cleanTitle,
      language: "zh_CN"
    };

    if (yearMatch) {
      params.year = yearMatch;
    }

    const response = await Widget.tmdb.get(`/search/${mediaType}`, {params});

    if (!response?.results?.length) {
      console.log(`[TMDB] 无返回数据`);
      return null;
    }

    const exactMatch = response.results.find(
      item => 
        (item.name === cleanTitle || item.title === cleanTitle) ||
        (item.original_name === cleanTitle || item.original_title === cleanTitle)
    );

    if (exactMatch) {
      return formatTmdbResult(exactMatch, mediaType);
    }

    return formatTmdbResult(response.results[0], mediaType);
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
