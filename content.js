// Content grounded in the supplied 2026-10-26 recruitment deck and data-collection overview.
const CONTENT = {
  applicationUrl: 'https://huazhi-ai.feishu.cn/share/base/form/shrcnGJ07QghT8hgnnsLc0cScNe?share_link_type=qrcode&ccm_open_type=form_v1_qrcode_share',
  journey: [
    {title:'你示范，设备记录。',description:'理解任务目标，按规范完成操作，记录真实场景中的关键交互与结果。你的认真，是数据质量的起点。',tags:['真人操作','任务完整','发现异常及时反馈']},
    {title:'把好质量这一关。',description:'检查画面、动作与任务结果。不合格数据返修或补采；失败样本按用途分类，不能混作成功示范。',tags:['规范检查','人工复核','问题可追溯']},
    {title:'让数据服务学习。',description:'质检合格的数据进入训练库，为模型学习提供素材。采什么、怎么采，要与具体训练用途对应。',tags:['合格入库','任务导向','版本管理']},
    {title:'看看机器人学得怎样。',description:'用独立评测样本检查能力，识别薄弱技能和场景，找出适合通过补充数据改善的问题。',tags:['独立评测','识别缺口','验证效果']},
    {title:'带着明确目标，再采一次。',description:'围绕发现的缺口定向补采，再训练、再验证。让每一批数据，都朝着真实需求前进一步。',tags:['定向补充','持续验证','形成闭环']}
  ],
  roles: {
    collector:{title:'数采员 · 把真实操作，记录到位。',description:'理解任务、执行标准、保证质量，在实践中发现并解决问题。',badge:'DATA COLLECTION',stages:[['培训上岗','基础培训 · 实操训练','逐步独立上岗'],['合格数采员','独立采集 · 质量达标','形成稳定交付能力'],['数采骨干','复杂任务 · 多场景适应','积累多项目经验'],['能力延伸','质量 · 培训 · 运营','探索更多项目方向']],note:'成长路径来自招募资料；根据实际表现与项目需求逐步发展。'},
    reviewer:{title:'质检员 · 让好数据，经得起检查。',description:'从理解质量标准，到独立检查、复核结果，练习有依据地判断。',badge:'QUALITY ASSURANCE',stages:[['面试了解','了解业务与标准','沟通岗位适配'],['学习与考核','通过题库练习','理解项目质检标准'],['独立质检','按标准检查数据','逐批复核，记录问题'],['复核与进阶','复核结果 · 处理争议','延伸至质量工程方向']],note:'进阶能力包括抽样设计、根因分析；具体标准以当前项目任务规格为准。'}
  },
  questions:[
    {tag:'样本 A',title:'成功完成了，但关键动作被挡住了。',description:'杯子放进了目标区，抓取和放置过程被手臂遮挡。',hint:'结果成功 ≠ 这条数据就一定可用。',answer:'no',reason:'关键交互不可见，会影响训练使用。应按任务规格检查遮挡问题，必要时调整采集条件后补采。',correctTitle:'对，关键过程也要看得清。',wrongTitle:'再想一步：关键动作看得见吗？',visual:'occluded'},
    {tag:'样本 B',title:'任务完成，关键过程也清楚完整。',description:'抓取、移动和放置都记录清楚，结果符合任务目标。',hint:'结合任务目标和采集规范一起判断。',answer:'yes',reason:'在本示例条件下，可以作为成功示范。实际生产中，还要按项目规格检查标定、时间同步等要求。',correctTitle:'对，完整与可用同样重要。',wrongTitle:'这次可以：目标完成，过程也完整。',visual:'complete'},
    {tag:'样本 C',title:'第一次失败，调整后又完成了。',description:'杯子滑落，示范者重新抓取并完成了放置。',hint:'失败与恢复过程，可以有不同的数据用途。',answer:'no',reason:'应标明失败与恢复过程，并区分用途。失败片段不能直接当成功示范；有效恢复动作可以用于恢复技能学习。',correctTitle:'对，区分用途才能用对数据。',wrongTitle:'需要分类，不能整段当作成功示范。',visual:'recovery'}
  ]
};
