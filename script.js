// ── DATA ──────────────────────────────────────────────────────────────────────

const TODAY_APTS = [
  { time:'09:00', client:'Анастасия Белова',  svc:'Стрижка женская',        master:'Анна Соколова',    price:'3 500 ₽', status:'confirmed' },
  { time:'09:30', client:'Виктория Зайцева',  svc:'Маникюр + гель',         master:'Мария Козлова',    price:'4 200 ₽', status:'confirmed' },
  { time:'10:00', client:'Екатерина Иванова',  svc:'Педикюр SPA',            master:'Елена Петрова',    price:'3 800 ₽', status:'confirmed' },
  { time:'10:30', client:'Светлана Морозова',  svc:'Окрашивание корней',     master:'Дарья Смирнова',   price:'6 500 ₽', status:'waiting'   },
  { time:'11:00', client:'Ольга Кузнецова',    svc:'Ламинирование ресниц',   master:'Анна Соколова',    price:'3 200 ₽', status:'confirmed' },
  { time:'11:30', client:'Наталья Фролова',    svc:'Укладка + укрепление',   master:'Мария Козлова',    price:'2 900 ₽', status:'waiting'   },
  { time:'12:00', client:'Марина Захарова',    svc:'Кератиновое выпрямление',master:'Ирина Волкова',    price:'8 000 ₽', status:'confirmed' },
  { time:'12:30', client:'Ирина Лазарева',     svc:'Чистка лица',            master:'Анна Соколова',    price:'4 500 ₽', status:'cancelled' },
];

const REVENUE_LABELS = ['3 июн','4 июн','5 июн','6 июн','7 июн','8 июн','9 июн','10 июн','11 июн','12 июн','13 июн','14 июн','15 июн','16 июн'];
const REVENUE_DATA   = [58200,74100,61800,88900,95300,70200,52100,83700,91200,79800,105400,87300,98700,112500];

const SVC_LABELS = ['Стрижка','Маникюр + гель','Окрашивание','Педикюр','Укладка','Косметология','Ламинирование'];
const SVC_DATA   = [34,28,22,18,14,10,8];

const METRICS_DATA = [
  { icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    ibg:'#EDE9FE', ic:'#7C3AED', val:'24', label:'Записей сегодня',   trend:'+8%',  hint:'vs вчера' },
  { icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    ibg:'#D1FAE5', ic:'#059669', val:'847 200 ₽', label:'Выручка за месяц',  trend:'+12%', hint:'vs июнь 2024' },
  { icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    ibg:'#DBEAFE', ic:'#2563EB', val:'18', label:'Новых клиентов',    trend:'+15%', hint:'за месяц' },
  { icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    ibg:'#FEF3C7', ic:'#D97706', val:'78%', label:'Загрузка мастеров', trend:'+5%',  hint:'avg по салону' },
];

const MASTERS = [
  { av:'АС', name:'Анна Соколова',    role:'Стилист',    color:'#7C3AED' },
  { av:'МК', name:'Мария Козлова',    role:'Колорист',   color:'#EC4899' },
  { av:'ЕП', name:'Елена Петрова',    role:'Маникюр',    color:'#059669' },
  { av:'ОН', name:'Ольга Новикова',   role:'Стилист',    color:'#2563EB' },
  { av:'ДС', name:'Дарья Смирнова',   role:'Колорист',   color:'#D97706' },
  { av:'ИВ', name:'Ирина Волкова',    role:'Косметолог', color:'#7C3AED' },
  { av:'НФ', name:'Наталья Фролова',  role:'Маникюр',    color:'#EC4899' },
  { av:'ТМ', name:'Татьяна Морозова', role:'Стилист',    color:'#059669' },
];

const SCHEDULE = [
  { master:0, time:'10:00–11:00', svc:'Стрижка женская',         client:'А. Белова',   status:'confirmed' },
  { master:0, time:'11:00–12:00', svc:'Укладка + укрепление',    client:'О. Кузнецова', status:'confirmed' },
  { master:0, time:'14:30–15:30', svc:'Чистка лица',             client:'И. Лазарева',  status:'cancelled' },
  { master:1, time:'11:00–13:30', svc:'Окрашивание (техника)',   client:'Д. Смирнова',  status:'waiting'   },
  { master:1, time:'14:00–15:00', svc:'Маникюр + гель',          client:'Е. Иванова',   status:'confirmed' },
  { master:2, time:'10:30–11:30', svc:'Маникюр + гель-лак',      client:'М. Захарова',  status:'confirmed' },
  { master:2, time:'13:00–14:00', svc:'Педикюр SPA',             client:'Н. Фролова',   status:'waiting'   },
  { master:2, time:'15:00–16:00', svc:'Маникюр классический',    client:'В. Зайцева',   status:'confirmed' },
  { master:3, time:'11:00–12:30', svc:'Стрижка + укладка',       client:'С. Морозова',  status:'confirmed' },
  { master:3, time:'14:00–15:00', svc:'Стрижка мужская',         client:'П. Сидоров',   status:'waiting'   },
  { master:4, time:'10:00–13:00', svc:'Кератиновое выпрямление', client:'К. Орлова',    status:'confirmed' },
  { master:4, time:'14:30–15:30', svc:'Окрашивание корней',      client:'Т. Морозова',  status:'confirmed' },
  { master:5, time:'11:30–12:30', svc:'Чистка лица',             client:'А. Козлова',   status:'confirmed' },
  { master:5, time:'13:30–15:00', svc:'Косметология',            client:'Ю. Белякова',  status:'waiting'   },
  { master:6, time:'09:30–10:30', svc:'Педикюр классический',    client:'Л. Громова',   status:'confirmed' },
  { master:6, time:'11:00–12:30', svc:'Маникюр + гель',          client:'Е. Тихонова',  status:'waiting'   },
  { master:7, time:'10:00–11:30', svc:'Стрижка + окрашивание',   client:'А. Белова',    status:'confirmed' },
  { master:7, time:'15:00–16:00', svc:'Укладка праздничная',     client:'И. Новикова',  status:'confirmed' },
];

const CLIENTS = [
  { name:'Анастасия Белова',    phone:'+7(916)234-56-78', lastVisit:'16.06.2025', visits:12, svc:'Стрижка женская',   vip:true  },
  { name:'Марина Захарова',     phone:'+7(929)890-12-34', lastVisit:'16.06.2025', visits:22, svc:'Маникюр + гель',    vip:true  },
  { name:'Екатерина Иванова',   phone:'+7(903)456-78-90', lastVisit:'16.06.2025', visits:18, svc:'Педикюр SPA',       vip:true  },
  { name:'Светлана Морозова',   phone:'+7(913)567-89-01', lastVisit:'10.06.2025', visits:16, svc:'Педикюр SPA',       vip:true  },
  { name:'Ольга Кузнецова',     phone:'+7(906)345-67-89', lastVisit:'13.06.2025', visits:14, svc:'Стрижка женская',   vip:false },
  { name:'Виктория Зайцева',    phone:'+7(925)123-45-67', lastVisit:'16.06.2025', visits:9,  svc:'Маникюр + гель',    vip:false },
  { name:'Наталья Фролова',     phone:'+7(917)789-01-23', lastVisit:'16.06.2025', visits:7,  svc:'Укладка',           vip:false },
  { name:'Ирина Лазарева',      phone:'+7(985)234-56-78', lastVisit:'15.06.2025', visits:5,  svc:'Чистка лица',       vip:false },
  { name:'Ксения Орлова',       phone:'+7(926)890-12-34', lastVisit:'14.06.2025', visits:11, svc:'Окрашивание',       vip:false },
  { name:'Дарья Смирнова',      phone:'+7(999)456-78-90', lastVisit:'12.06.2025', visits:8,  svc:'Окрашивание',       vip:false },
  { name:'Людмила Громова',     phone:'+7(901)567-89-01', lastVisit:'11.06.2025', visits:4,  svc:'Педикюр',           vip:false },
  { name:'Алина Соболева',      phone:'+7(915)345-67-89', lastVisit:'09.06.2025', visits:3,  svc:'Ламинирование',     vip:false },
  { name:'Полина Козлова',      phone:'+7(922)123-45-67', lastVisit:'08.06.2025', visits:6,  svc:'Маникюр + гель',    vip:false },
  { name:'Юлия Белякова',       phone:'+7(931)789-01-23', lastVisit:'07.06.2025', visits:10, svc:'Косметология',      vip:false },
  { name:'Татьяна Лебедева',    phone:'+7(987)234-56-78', lastVisit:'06.06.2025', visits:15, svc:'Стрижка + укладка', vip:true  },
  { name:'Инна Новикова',       phone:'+7(903)890-12-34', lastVisit:'05.06.2025', visits:2,  svc:'Укладка',           vip:false },
  { name:'Мария Тихонова',      phone:'+7(916)456-78-90', lastVisit:'04.06.2025', visits:13, svc:'Маникюр + гель',    vip:false },
  { name:'Елена Тихонова',      phone:'+7(929)567-89-01', lastVisit:'03.06.2025', visits:20, svc:'Педикюр SPA',       vip:true  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function statusLabel(s) { return s==='confirmed'?'Подтверждена':s==='waiting'?'Ожидание':'Отменена'; }
function statusClass(s) { return s==='confirmed'?'b-ok':s==='waiting'?'b-wait':'b-cancel'; }
function statusDot(s)   { return s==='confirmed'?'#10B981':s==='waiting'?'#F59E0B':'#EF4444'; }

function fmt(n){ return n.toLocaleString('ru-RU'); }

function initials(name){
  return name.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
}

const AV_COLORS = ['#7C3AED','#EC4899','#059669','#2563EB','#D97706','#7C3AED','#EC4899','#059669'];
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ── RENDER METRICS ────────────────────────────────────────────────────────────

let bookingCount = 24;

function renderMetrics(){
  document.getElementById('metrics-grid').innerHTML = METRICS_DATA.map((m,i)=>`
    <div class="m-card">
      <div class="m-top">
        <div class="m-icon" style="background:${m.ibg};color:${m.ic}">${m.icon}</div>
        <span class="m-trend trend-up">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          ${m.trend}
        </span>
      </div>
      <div class="m-val"${i===0?' id="booking-count"':''}>${m.val}</div>
      <div class="m-label">${m.label}</div>
      <div class="m-hint">${m.hint}</div>
    </div>`).join('');
}

// ── RENDER TODAY'S APPOINTMENTS ───────────────────────────────────────────────

function renderToday(){
  document.getElementById('today-list').innerHTML = TODAY_APTS.map(a=>`
    <div class="apt-row">
      <span class="apt-time">${a.time}</span>
      <span class="apt-dot" style="background:${statusDot(a.status)}"></span>
      <div class="apt-info">
        <div class="apt-client">${a.client}</div>
        <div class="apt-svc">${a.svc}</div>
      </div>
      <span class="apt-master-name">${a.master}</span>
      <span class="apt-price">${a.price}</span>
      <span class="badge ${statusClass(a.status)}">
        <span class="apt-dot" style="background:${statusDot(a.status)};width:6px;height:6px;flex-shrink:0;border-radius:50%"></span>
        ${statusLabel(a.status)}
      </span>
    </div>`).join('');
}

// ── CHARTS ────────────────────────────────────────────────────────────────────

function initCharts(){
  const ctx1 = document.getElementById('revenueChart').getContext('2d');
  const grad = ctx1.createLinearGradient(0,0,0,260);
  grad.addColorStop(0,'rgba(124,58,237,.18)');
  grad.addColorStop(1,'rgba(124,58,237,0)');

  new Chart(ctx1,{
    type:'line',
    data:{
      labels: REVENUE_LABELS,
      datasets:[{
        data: REVENUE_DATA,
        borderColor:'#7C3AED', borderWidth:2,
        pointRadius:3, pointBackgroundColor:'#7C3AED',
        pointHoverRadius:5, tension:.42,
        fill:true, backgroundColor:grad,
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'#1E1B4B', titleColor:'#fff', bodyColor:'rgba(255,255,255,.75)',
          padding:10, cornerRadius:10, displayColors:false,
          callbacks:{ label: ctx=>`${fmt(ctx.parsed.y)} ₽` }
        }
      },
      scales:{
        x:{ grid:{display:false}, ticks:{font:{size:11},color:'#9CA3AF'} },
        y:{ grid:{color:'rgba(0,0,0,.04)'}, ticks:{font:{size:11},color:'#9CA3AF', callback:v=>`${fmt(v/1000)}k`} }
      }
    }
  });

  const ctx2 = document.getElementById('servicesChart').getContext('2d');
  new Chart(ctx2,{
    type:'bar',
    data:{
      labels: SVC_LABELS,
      datasets:[{
        data: SVC_DATA,
        backgroundColor: ['#7C3AED','#8B5CF6','#A78BFA','#EC4899','#F472B6','#10B981','#34D399'],
        borderRadius:6, borderSkipped:false,
      }]
    },
    options:{
      indexAxis:'y',
      responsive:true, maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{
          backgroundColor:'#1E1B4B', titleColor:'#fff', bodyColor:'rgba(255,255,255,.75)',
          padding:10, cornerRadius:10, displayColors:false,
          callbacks:{ label: ctx=>`${ctx.parsed.x} записей` }
        }
      },
      scales:{
        x:{ grid:{display:false}, ticks:{font:{size:11},color:'#9CA3AF'} },
        y:{ grid:{display:false}, ticks:{font:{size:11},color:'#6B7280'} }
      }
    }
  });
}

// ── NAVIGATION ────────────────────────────────────────────────────────────────

function navigate(id){
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active', el.dataset.section===id));
  document.querySelectorAll('.section').forEach(s=>s.classList.toggle('active', s.id==='section-'+id));
}

// ── SCHEDULE ─────────────────────────────────────────────────────────────────

let schFilter = 'all';

function renderSchedule(){
  const grid = document.getElementById('masters-grid');
  if(!grid) return;
  grid.innerHTML = MASTERS.map((m,i)=>{
    const apts = SCHEDULE.filter(a=>a.master===i && (schFilter==='all'||a.status===schFilter));
    return `
      <div class="m-col">
        <div class="m-col-head">
          <div class="m-av" style="background:${m.color}">${m.av}</div>
          <div><div class="m-nm">${m.name}</div><div class="m-rl">${m.role}</div></div>
        </div>
        <div class="m-apts">
          ${apts.length ? apts.map(a=>`
            <div class="sch-card ${a.status}">
              <div class="sch-t">${a.time}</div>
              <div class="sch-svc">${a.svc}</div>
              <div class="sch-cl">${a.client}</div>
            </div>`).join('') : '<div class="m-empty">Нет записей</div>'}
        </div>
      </div>`;
  }).join('');
}

// ── CLIENTS ───────────────────────────────────────────────────────────────────

function renderClients(list){
  const tbody = document.getElementById('clients-tbody');
  const counter = document.getElementById('cl-count');
  if(!tbody) return;
  tbody.innerHTML = list.map((c,i)=>`
    <tr>
      <td><div style="display:flex;align-items:center;gap:10px">
        <div class="cl-av" style="background:${AV_COLORS[i%AV_COLORS.length]}">${initials(c.name)}</div>
        <div><div class="cl-nm">${c.name}</div>${c.vip?'<span class="vip-tag">★ VIP</span>':''}</div>
      </div></td>
      <td class="cl-ph">${c.phone}</td>
      <td>${c.lastVisit}</td>
      <td><span class="visit-chip">${c.visits}</span></td>
      <td><span class="svc-tag">${c.svc}</span></td>
    </tr>`).join('');
  if(counter) counter.textContent = list.length;
}

// ── DROPDOWNS & NOTIFICATION PANEL ───────────────────────────────────────────

const profileDropdown = ()=>document.getElementById('profile-dropdown');
const notifPanel      = ()=>document.getElementById('notif-panel');

function closeAll(){
  profileDropdown()?.classList.remove('open');
  notifPanel()?.classList.remove('open');
  document.getElementById('notif-btn')?.classList.remove('panel-open');
}

function openDropdown(triggerEl){
  const dd = profileDropdown();
  const isSidebar = triggerEl.id === 'sb-profile-btn';
  const rect = triggerEl.getBoundingClientRect();

  if(isSidebar){
    dd.style.left   = `${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sw'))||240}px`;
    dd.style.top    = 'auto';
    dd.style.right  = 'auto';
    dd.style.bottom = '12px';
    dd.style.transformOrigin = 'bottom left';
  } else {
    dd.style.top    = `${rect.bottom + 8}px`;
    dd.style.right  = `${window.innerWidth - rect.right}px`;
    dd.style.left   = 'auto';
    dd.style.bottom = 'auto';
    dd.style.transformOrigin = 'top right';
  }
  dd.classList.add('open');
}

function openNotifPanel(){
  const btn  = document.getElementById('notif-btn');
  const rect = btn.getBoundingClientRect();
  const np   = notifPanel();
  np.style.top   = `${rect.bottom + 8}px`;
  np.style.right = `${window.innerWidth - rect.right}px`;
  np.classList.add('open');
  btn.classList.add('panel-open');
  // hide badge
  const badge = document.getElementById('notif-badge');
  if(badge) badge.classList.add('hidden');
}

// ── LIVE TOAST FEED ───────────────────────────────────────────────────────────

const LIVE_NAMES = [
  'Алина Соболева','Ксения Орлова','Виктория Зайцева','Татьяна Морозова',
  'Наталья Фролова','Полина Козлова','Юлия Белякова','Людмила Громова',
];
const LIVE_SVCS = ['Стрижка женская','Маникюр + гель','Окрашивание','Педикюр SPA','Укладка','Чистка лица','Ламинирование ресниц','Кератиновое выпрямление'];
const LIVE_TIMES = ['09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','14:30','15:00','15:30','16:00','17:00','17:30','18:00','18:30','19:00'];

const CALENDAR_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const CLOSE_SVG   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function showToast(){
  const name  = pick(LIVE_NAMES);
  const svc   = pick(LIVE_SVCS);
  const time  = pick(LIVE_TIMES);
  const container = document.getElementById('toast-container');
  if(!container) return;

  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `
    <div class="toast-icon">${CALENDAR_SVG}</div>
    <div class="toast-body">
      <div class="toast-title">Новая запись</div>
      <div class="toast-text">${name} · ${svc} · ${time}</div>
    </div>
    <button class="toast-close" aria-label="Закрыть">${CLOSE_SVG}</button>`;
  container.appendChild(el);

  el.querySelector('.toast-close').addEventListener('click', ()=>dismissToast(el));

  // increment booking counter
  bookingCount++;
  const countEl = document.getElementById('booking-count');
  if(countEl){
    countEl.textContent = bookingCount;
    countEl.classList.remove('count-bump');
    void countEl.offsetWidth;
    countEl.classList.add('count-bump');
  }

  setTimeout(()=>dismissToast(el), 4000);
}

function dismissToast(el){
  if(!el.isConnected || el.classList.contains('toast-out')) return;
  el.classList.add('toast-out');
  setTimeout(()=>el.remove(), 320);
}

function scheduleToast(){
  const delay = 8000 + Math.random() * 7000;
  setTimeout(()=>{ showToast(); scheduleToast(); }, delay);
}

// ── INIT ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', ()=>{

  // Render dashboard data
  renderMetrics();
  renderToday();
  initCharts();

  // Navigation
  document.querySelectorAll('.nav-item').forEach(item=>{
    item.addEventListener('click', ()=>navigate(item.dataset.section));
  });
  document.getElementById('apts-link')?.addEventListener('click', ()=>navigate('schedule'));

  // Schedule filters
  renderSchedule();
  document.querySelectorAll('.sch-filter').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      schFilter = btn.dataset.filter;
      document.querySelectorAll('.sch-filter').forEach(b=>b.classList.toggle('active', b===btn));
      renderSchedule();
    });
  });

  // Clients table
  renderClients(CLIENTS);
  const clInput = document.getElementById('cl-input');
  if(clInput){
    clInput.addEventListener('input', ()=>{
      const q = clInput.value.trim().toLowerCase();
      renderClients(q ? CLIENTS.filter(c=>c.name.toLowerCase().includes(q)||c.phone.includes(q)) : CLIENTS);
    });
  }

  // Profile dropdown — topbar avatar
  document.getElementById('profile-btn')?.addEventListener('click', e=>{
    e.stopPropagation();
    const wasOpen = profileDropdown()?.classList.contains('open');
    closeAll();
    if(!wasOpen) openDropdown(e.currentTarget);
  });

  // Profile dropdown — sidebar footer
  document.getElementById('sb-profile-btn')?.addEventListener('click', e=>{
    e.stopPropagation();
    const wasOpen = profileDropdown()?.classList.contains('open');
    closeAll();
    if(!wasOpen) openDropdown(e.currentTarget);
  });

  // Prevent close when clicking inside dropdown
  document.getElementById('profile-dropdown')?.addEventListener('click', e=>e.stopPropagation());

  // Notification bell
  document.getElementById('notif-btn')?.addEventListener('click', e=>{
    e.stopPropagation();
    const wasOpen = notifPanel()?.classList.contains('open');
    closeAll();
    if(!wasOpen) openNotifPanel();
  });

  // Prevent close when clicking inside notification panel
  document.getElementById('notif-panel')?.addEventListener('click', e=>e.stopPropagation());

  // Mark all as read button
  document.getElementById('np-mark-btn')?.addEventListener('click', ()=>{
    document.querySelectorAll('.np-item.unread').forEach(el=>el.classList.remove('unread'));
  });

  // Close on outside click or Escape
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAll(); });

  // Start live toast feed
  scheduleToast();
});
