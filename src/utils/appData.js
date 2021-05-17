/*
* author:TanJun
* describe:
* createTime:2018/7/14
* */
import { appDataType, higgschartsType, NodeCategory } from 'constants/higgscharts';
import Filter from 'config/higgscharts/filter';
// import Filter from 'components/higgsCharts/filter';

const data = {};
var { NORMAL, RISK, BLACK, REVOKE } = NodeCategory;

function getAnalyzeResult(result) {
    var analyzeResult = { 
        total: {
            num: 0, color: NORMAL.color, name: '关联方总数' 
        },
        risk: {
            num: 0, color: RISK.color, name: '高危预警' 
        },
        black: {
            num: 0, color: BLACK.color, name: '黑名单' 
        },
        revoke: {
            num: 0, color: REVOKE.color, name: '注吊销' 
        }
    };
    return Object.keys(analyzeResult).map((key) => {
        analyzeResult[key].num = result[key].length;
        return analyzeResult[key];
    }); 
}

function getCommonAnalysis(nodes = [], names = {}) {

    var normalNum = nodes.filter(({ category, slight = false, data }) => category === NORMAL.value && slight === false).length;
    let total = nodes.filter(({ data }) => {
        return !data.labels || !data.labels.includes('Event');
    }).length;
    var riskNum = nodes.filter(({ category, slight = false }) => category === RISK.value && slight === false).length;
    var blackNum = nodes.filter(({ category, slight = false }) => category === BLACK.value && slight === false).length;
    var revokeNum = nodes.filter(({ category, slight = false }) => category === REVOKE.value && slight === false).length;

    return {
        total: {
            num: total, color: NORMAL.color, name: '关联方总数' 
        },
        risk: {
            num: riskNum, color: RISK.color, name: '高危预警' 
        },
        black: {
            num: blackNum, color: BLACK.color, name: '黑名单' 
        },
        revoke: {
            num: revokeNum, color: REVOKE.color, name: '注吊销' 
        }
    };
}

function getIndustryAnalysis(nodes = [], circles = []) {
    const OTHER = '其他';
    var analysis = {};

    circles.forEach(({ text }) => analysis[text] = []);
    var nameArr = Object.keys(analysis);
    nodes.forEach((node) => {
        var { data, slight } = node;
        if (!slight) {
            var { province, city } = data;
            var name;
            nameArr.map((d) => { 
                if (d.startsWith(province)) {
                    name = d;
                }});
            if (analysis[name]) {
                analysis[name].push(node);
            } else {
                if (!analysis[OTHER]) {
                    analysis[OTHER] = [];
                }
                analysis[OTHER].push(node);
            }
        }
    });
    // 从多到少排序
    var analysisOrder = Object.entries(analysis).sort((first, second) => {
        return second[1].length - first[1].length;
    });

    return analysisOrder.map(([province, nodes]) => {
        var num = nodes.filter(({ slight }) => !slight).length;

        return { 
            num, color: NodeCategory.NORMAL.color, name: province
        };
    });
}

class appData {
    static setAppData({ type, info }) {
        data[type] = info;
    }

    static getAppData({ type }) {
        return data[type];
    }
    
    static getNodeInfo(data = {}) {
        let nodes = [];

        if (data && data.nodes) {
            nodes = data.nodes;
        }
        let total = nodes.length;
        let company = nodes.filter(({ data }) => {
            return !data.human && data?.labels.includes('Entity') && data?.labels.includes('Company');
        }).length;
        let companyList = nodes.filter(({ data }) => !data.human);
        let person = nodes.filter(({ data }) => data.human).length;
        let slightNodes = nodes.filter(({ slight, category, select }) => select && category !== 'person');
        let history = nodes.filter(({ isHistory }) => isHistory).length;
        
        return { total, company, person, history, nodes, slightNodes, companyList };
    }
    // 事件关系
    static getEventNodeInfo(data = {}) {
        let nodes = [];

        if (data && data.nodes) {
            nodes = data.nodes;
        }
        let total = nodes.filter(({ data }) => !data.labels.includes('Event')).length;
        let company = nodes.filter(({ data }) => {
            return  data.labels.includes('Company');
        }).length;
        let companyList = nodes.filter(({ data }) => !data.human);
        let person = nodes.filter(({ data }) => data.human).length;
        let slightNodes = nodes.filter(({ slight, category, select }) => select && category !== 'person');
        let history = nodes.filter(({ isHistory }) => isHistory).length;
        return { total, company, person, history, nodes, slightNodes, companyList };
    }

    static getAnalysisResult(type, data = {}) {
        var { CIRCLE, COMMUNITY, STOCK, SEEK, INDUSTRY, REGION, EVENT, NATURAL } = higgschartsType;
        var { nodes = [], circles = [] } = data;
        var nodesTemp = [];
        var analysisResult;
        switch (type) {
            // 新图谱方法
            case CIRCLE:
            case COMMUNITY:
            case NATURAL:
                nodesTemp = nodes.filter(({ slight }) => !slight);
                analysisResult = getAnalyzeResult(Filter.calculateFilterTypeCount(nodesTemp));
                break;
            case STOCK:
            case SEEK:
            case EVENT:
                nodesTemp = nodes.filter(({ slight }) => !slight);
                analysisResult = getCommonAnalysis(nodesTemp);
                break;
            case INDUSTRY:
                nodesTemp = nodes.filter(({ slight }) => !slight);
                analysisResult = getIndustryAnalysis(nodesTemp, circles);
                break;
            case REGION:
                break;
        }

        return analysisResult;
    }
}

export default appData;