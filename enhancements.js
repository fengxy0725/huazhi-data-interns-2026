'use strict';
// Action types are from the supplied brochure (page 5).
// The descriptions below are recruitment illustrations, not production SOPs.
const TASKS = {
  grasp:{number:'01',label:'抓取与放置',title:'拿稳，也要放准。',description:'按任务要求抓起物体，移动到指定位置，再平稳放下。',focus:'关键动作看得清 · 任务过程录得全'},
  insert:{number:'02',label:'对位与插接',title:'对准，再完成连接。',description:'辨认方向与位置，按规范完成对位、插接，并检查结果。',focus:'对位过程不遮挡 · 完成状态可判断'},
  turn:{number:'03',label:'旋转与拧动',title:'一个旋转，记录完整。',description:'依照任务要求完成旋转或拧动，记录操作过程与最终状态。',focus:'遵循任务标准 · 异常及时反馈'},
  inspect:{number:'04',label:'观察与检查',title:'多看一眼，少漏一个细节。',description:'对照任务要求检查操作结果，发现异常后做好记录和反馈。',focus:'判断有依据 · 问题可追溯'}
};
function chooseTask(key){
  const task=TASKS[key];
  if(!task)return;
  document.querySelectorAll('[data-task]').forEach(button=>{
    const selected=button.dataset.task===key;
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  const panel=document.querySelector('#task-panel');
  panel.setAttribute('aria-labelledby',`task-tab-${key}`);
  panel.querySelector('.task-kicker').textContent=`${task.number} / ${task.label}`;
  panel.querySelector('h4').textContent=task.title;
  panel.querySelector('h4 + p').textContent=task.description;
  panel.querySelector('.task-focus strong').textContent=task.focus;
}
document.querySelectorAll('[data-task]').forEach(button=>button.addEventListener('click',()=>chooseTask(button.dataset.task)));
document.querySelector('.task-tabs').addEventListener('keydown',event=>{
  tabKeyboard(event,'[data-task]',button=>chooseTask(button.dataset.task));
});
// Use the original application link on mobile, with the QR available below.
const dockLinks=[...document.querySelectorAll('.mobile-dock a')];
const dockObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  dockLinks.forEach(link=>{
    if(link.hash===`#${visible.target.id}`)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
},{rootMargin:'-15% 0px -55% 0px',threshold:0});
document.querySelectorAll('.chapter').forEach(section=>dockObserver.observe(section));

const deviceSelector = document.querySelector('.equipment-selector');
const deviceTabs = Array.from(deviceSelector.querySelectorAll('[data-equip-tab]'));

function showDevice(selectedTab) {
  for (const tab of deviceTabs) {
    const active = tab === selectedTab;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}

for (const tab of deviceTabs) {
  tab.addEventListener('click', () => showDevice(tab));
}
deviceSelector.addEventListener('keydown', event => tabKeyboard(event, '[data-equip-tab]', showDevice));
showDevice(deviceTabs[0]);
deviceSelector.hidden = false;
