// Demo data shared by the ESAD apps on this site: Approvals, Documents and Projects.
// Everything is kept in this browser (localStorage). Edit people and sample data here.
window.DEMO = (() => {
  'use strict';

  // The demo is seen through the IT manager's eyes.
  const ME = 'hamid';

  // Habib, Hamid and Noman are real (first names only). Everyone else is made up.
  const PEOPLE = [
    { id: 'habib', name: 'Habib', title: 'CEO', dept: 'Executive', manager: null, teams: [] },
    { id: 'hamid', name: 'Hamid', title: 'IT Manager', dept: 'IT', manager: 'habib', teams: [] },
    { id: 'noman', name: 'Noman', title: 'Junior Apps Developer', dept: 'IT', manager: 'hamid', teams: [] },
    { id: 'khalid', name: 'Khalid', title: 'Systems Engineer', dept: 'IT', manager: 'hamid', teams: [] },
    { id: 'hana', name: 'Hana', title: 'IT Support Lead', dept: 'IT', manager: 'hamid', teams: [] },
    { id: 'sara', name: 'Sara', title: 'HR Manager', dept: 'HR', manager: 'habib', teams: [] },
    { id: 'aisha', name: 'Aisha', title: 'Recruitment Specialist', dept: 'HR', manager: 'sara', teams: [] },
    { id: 'faisal', name: 'Faisal', title: 'Finance Manager', dept: 'Finance', manager: 'habib', teams: [] },
    { id: 'nadia', name: 'Nadia', title: 'QHSE Officer', dept: 'QHSE', manager: 'habib', teams: ['QHSE'] },
    { id: 'yousef', name: 'Yousef', title: 'Fleet Manager', dept: 'Operations', manager: 'habib', teams: [] },
    { id: 'maryam', name: 'Maryam', title: 'Fleet Coordinator', dept: 'Operations', manager: 'yousef', teams: [] },
    { id: 'omar', name: 'Omar', title: 'Project Coordinator', dept: 'Operations', manager: 'yousef', teams: [] },
    { id: 'bilal', name: 'Bilal', title: 'Account Manager', dept: 'Sales', manager: 'habib', teams: [] },
  ];
  const DEPARTMENTS = ['Executive', 'IT', 'HR', 'Finance', 'QHSE', 'Operations', 'Sales'];

  const KEYS = {
    approvals: 'esad-approvals-demo-v3',
    documents: 'esad-documents-demo-v1',
    projects: 'esad-projects-demo-v1',
    assets: 'esad-assets-demo-v1',
  };

  /* ---------- helpers ---------- */
  const DAY = 864e5;
  const person = id => PEOPLE.find(p => p.id === id) || { id, name: 'Unknown', title: '', dept: '' };
  const ymd = d => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
  const today = () => ymd(new Date());
  const inDays = n => ymd(new Date(Date.now() + n * DAY));
  const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };

  // "Reset demo data" in any app resets all three, since they are linked.
  function reset() {
    try { Object.values(KEYS).forEach(k => localStorage.removeItem(k)); } catch { /* storage blocked */ }
  }

  /* ---------- documents ---------- */
  const DOC_DEPARTMENTS = [
    { name: 'Compliance', code: 'CO', icon: 'bi-shield-check' },
    { name: 'Legal Affairs', code: 'LG', icon: 'bi-hammer' },
    { name: 'Support Services', code: 'SS', icon: 'bi-life-preserver' },
    { name: 'Human Resources', code: 'HR', icon: 'bi-people' },
    { name: 'Procurement', code: 'PC', icon: 'bi-cart-check' },
    { name: 'QHSE', code: 'QH', icon: 'bi-clipboard2-pulse' },
    { name: 'IT', code: 'IT', icon: 'bi-pc-display' },
    { name: 'B2B Operations', code: 'B2B', icon: 'bi-building' },
    { name: 'MARCOM', code: 'MC', icon: 'bi-megaphone' },
    { name: 'B2C Sales and Operations', code: 'B2C', icon: 'bi-bag' },
    { name: 'Financial Control', code: 'FC', icon: 'bi-calculator' },
    { name: 'Treasury', code: 'TR', icon: 'bi-cash-coin' },
    { name: 'Company-wide', code: 'CW', icon: 'bi-buildings' },
  ];
  const DOC_TYPES = [
    { name: 'Policy', code: 'PO', plural: 'Policies', icon: 'bi-journal-check', desc: 'Rules and principles' },
    { name: 'Procedure', code: 'PR', plural: 'Procedures', icon: 'bi-list-ol', desc: 'How we do things' },
    { name: 'Form', code: 'FM', plural: 'Forms', icon: 'bi-ui-checks', desc: 'Records and templates' },
    { name: 'Plan', code: 'PL', plural: 'Plans', icon: 'bi-map', desc: 'Programmes and plans' },
  ];
  const DOC_OWNERS = {
    'Compliance': 'nadia', 'Legal Affairs': 'faisal', 'Support Services': 'yousef', 'Human Resources': 'sara', 'Procurement': 'faisal',
    'QHSE': 'nadia', 'IT': 'hamid', 'B2B Operations': 'yousef', 'MARCOM': 'bilal', 'B2C Sales and Operations': 'bilal',
    'Financial Control': 'faisal', 'Treasury': 'faisal', 'Company-wide': 'habib',
  };
  const DOC_TITLES = {
    'Compliance': [['Policy', 'Anti-Bribery and Corruption Policy'], ['Procedure', 'Regulatory Compliance Review Procedure'], ['Form', 'Conflict of Interest Declaration']],
    'Legal Affairs': [['Policy', 'Contract Management Policy'], ['Procedure', 'Legal Review of Agreements Procedure'], ['Form', 'Power of Attorney Request Form']],
    'Support Services': [['Procedure', 'Office Maintenance Request Procedure'], ['Form', 'Visitor Registration Form'], ['Plan', 'Facilities Maintenance Plan']],
    'Human Resources': [['Policy', 'Recruitment and Onboarding Policy'], ['Procedure', 'Leave Management Procedure'], ['Form', 'Employee Exit Checklist'], ['Plan', 'Annual Training Plan']],
    'Procurement': [['Policy', 'Procurement and Vendor Policy'], ['Procedure', 'Supplier Evaluation Procedure'], ['Form', 'Purchase Requisition Form']],
    'QHSE': [['Policy', 'Quality Policy'], ['Procedure', 'Control of Documented Information'], ['Procedure', 'Non-Conformance and Corrective Action'], ['Form', 'Incident Report Form'], ['Plan', 'Internal Audit Plan']],
    'IT': [['Policy', 'Information Security Policy'], ['Procedure', 'Access Management Procedure'], ['Form', 'IT Equipment Request Form'], ['Plan', 'Disaster Recovery Plan']],
    'B2B Operations': [['Procedure', 'Client Onboarding Procedure'], ['Procedure', 'Candidate Deployment Procedure'], ['Form', 'Client Service Request Form']],
    'MARCOM': [['Policy', 'Brand and Communications Policy'], ['Procedure', 'Social Media Approval Procedure'], ['Plan', 'Annual Marketing Plan']],
    'B2C Sales and Operations': [['Procedure', 'Customer Booking Procedure'], ['Form', 'Customer Complaint Form'], ['Plan', 'Quarterly Sales Plan']],
    'Financial Control': [['Policy', 'Expense Reimbursement Policy'], ['Procedure', 'Month-End Closing Procedure'], ['Form', 'Expense Claim Form']],
    'Treasury': [['Policy', 'Treasury and Cash Management Policy'], ['Procedure', 'Bank Reconciliation Procedure'], ['Form', 'Payment Authorization Form']],
    'Company-wide': [['Policy', 'Code of Conduct'], ['Policy', 'Document Control Policy'], ['Procedure', 'Management Review Procedure'], ['Plan', 'Business Continuity Plan']],
  };
  // Documents whose owner should review them soon (days from today), and ones that are no longer in force
  const DUE_SOON = { 'Information Security Policy': 9, 'IT Equipment Request Form': 21 };
  const NOT_ACTIVE = {
    'Visitor Registration Form': 'Superseded', 'Annual Training Plan': 'Obsolete', 'Purchase Requisition Form': 'Superseded',
    'Client Onboarding Procedure': 'Obsolete', 'Customer Booking Procedure': 'Superseded', 'Bank Reconciliation Procedure': 'Obsolete',
  };

  const docDept = name => DOC_DEPARTMENTS.find(d => d.name === name);
  const docType = name => DOC_TYPES.find(t => t.name === name);
  const docLabel = d => `${d.code} · ${d.title}`;            // how Approvals refers to a document
  const docId = d => `${d.code}-${d.revision}`;               // e.g. ESAD-HR-PR-01-V1.0
  function nextCode(docs, dept, type) {
    const prefix = `ESAD-${docDept(dept)?.code || 'CW'}-${docType(type)?.code || 'PR'}-`;
    const n = docs.filter(d => d.code.startsWith(prefix)).length + 1;
    return prefix + String(n).padStart(2, '0');
  }

  function seedDocuments() {
    const data = { docs: [], nextId: 1, applied: [] };
    let n = 0;
    for (const [dept, list] of Object.entries(DOC_TITLES)) {
      for (const [type, title] of list) {
        n++;
        const effective = inDays(-n * 11);
        const d = new Date(effective); d.setFullYear(d.getFullYear() + 1);
        data.docs.push({
          id: data.nextId++, code: nextCode(data.docs, dept, type), title, dept, type,
          revision: n % 5 === 0 ? 'V2.0' : 'V1.0',
          status: NOT_ACTIVE[title] || 'Active',
          effective, nextReview: title in DUE_SOON ? inDays(DUE_SOON[title]) : ymd(d), owner: DOC_OWNERS[dept],
        });
      }
    }
    // Published through the sample approval "Software Request Form" (see Approvals)
    data.docs.push({ id: data.nextId++, code: nextCode(data.docs, 'IT', 'Form'), title: 'Software Request Form', dept: 'IT', type: 'Form',
      revision: 'V1.0', status: 'Active', effective: inDays(-4), nextReview: inDays(361), owner: 'noman' });
    return data;
  }

  // Apply document changes that were approved in Approvals: publish, revise or retire.
  function applyApprovals(data) {
    const approvals = read(KEYS.approvals);
    let changed = false;
    for (const r of approvals?.requests || []) {
      const key = `${r.id}:${r.created}`;
      if (r.typeId !== 'document' || r.status !== 'approved' || r.seeded || data.applied.includes(key)) continue;
      const v = r.values, day = ymd(new Date(r.closedAt));
      const next = new Date(r.closedAt); next.setFullYear(next.getFullYear() + 1);
      if (v.change === 'New document') {
        data.docs.push({ id: data.nextId++, code: nextCode(data.docs, v.dept, v.newType), title: v.title, dept: v.dept, type: v.newType,
          revision: 'V1.0', status: 'Active', effective: day, nextReview: ymd(next), owner: r.requesterId });
      } else {
        const doc = data.docs.find(d => docLabel(d) === v.document);
        if (doc && v.change === 'Retire') doc.status = 'Obsolete';
        else if (doc) Object.assign(doc, { revision: `V${(parseFloat(doc.revision.slice(1)) + 1).toFixed(1)}`, effective: day, nextReview: ymd(next) });
      }
      data.applied.push(key);
      changed = true;
    }
    return changed;
  }

  function documents() {
    let data = read(KEYS.documents);
    const fresh = !data;
    if (fresh) data = seedDocuments();
    if (applyApprovals(data) || fresh) write(KEYS.documents, data);
    return data;
  }
  const saveDocuments = data => write(KEYS.documents, data);

  /* ---------- projects ---------- */
  const PROJECT_STATUS = ['Active', 'On Hold', 'Completed', 'Cancelled'];
  const ITEM_STATUS = ['To Do', 'In Progress', 'Done'];
  const PROJECT_DEPTS = ['Finance', 'HR', 'IT', 'Operations', 'Quality', 'Sales'];

  function seedProjects() {
    const now = Date.now();
    const at = (days, hours = 0) => new Date(now - days * DAY - hours * 36e5).toISOString();
    const check = (...lines) => lines.map(l => ({ text: l.replace(/^\+ /, ''), done: l.startsWith('+ ') }));
    const data = { projects: [], items: [], next: { projects: 1, items: 1 } };
    const project = (days, o) => {
      const p = { id: data.next.projects++, description: '', schema: [], custom: {}, ...o,
        created: at(days), createdBy: o.owner, modified: at(Math.max(days - 2, 0), 3), modifiedBy: o.owner };
      data.projects.push(p);
      return p;
    };
    const item = (p, title, status, who, days, extra = {}) => {
      data.items.push({ id: data.next.items++, projectId: p.id, title, status, due: extra.due == null ? '' : inDays(extra.due),
        description: extra.description || '', assignees: who, checklist: extra.checklist || [], custom: extra.custom || {},
        created: at(days + 4), createdBy: p.owner, modified: at(days, 2), modifiedBy: who[0] || p.owner });
    };

    const onboarding = project(40, {
      title: 'Employee onboarding portal', status: 'Active', department: 'HR', owner: 'sara',
      description: 'Self-service portal for new hires: documents, IT accounts and a first-week checklist.',
      schema: [
        { id: 'fphase', name: 'Phase', type: 'choice', options: ['Design', 'Build', 'Test'], target: 'workItem' },
        { id: 'feffort', name: 'Effort (days)', type: 'number', target: 'workItem' },
        { id: 'fgolive', name: 'Go-live', type: 'date', target: 'project' },
      ],
      custom: { fgolive: inDays(45) },
    });
    item(onboarding, 'Map onboarding steps with HR', 'Done', ['sara'], 30, { due: -28, custom: { fphase: 'Design', feffort: 3 } });
    item(onboarding, 'Design the welcome page', 'Done', ['aisha'], 21, { due: -20, custom: { fphase: 'Design', feffort: 2 } });
    item(onboarding, 'Build the document upload step', 'In Progress', ['noman'], 1, { due: -3, custom: { fphase: 'Build', feffort: 5 },
      description: 'Accept ID, passport and certificates as PDF or image.',
      checklist: check('+ Accept PDF and images', '+ Limit files to 10 MB', 'Scan uploads for viruses', 'Show upload progress') });
    item(onboarding, 'Create accounts in Entra ID automatically', 'In Progress', ['noman', 'khalid'], 0, { due: 5, custom: { fphase: 'Build', feffort: 4 },
      checklist: check('+ Service account for the flow', 'Map job titles to groups') });
    item(onboarding, 'Write the day-one IT checklist', 'To Do', ['hana'], 3, { due: -1, custom: { fphase: 'Build', feffort: 1 } });
    item(onboarding, 'User acceptance testing', 'To Do', [], 5, { due: 20, custom: { fphase: 'Test' } });

    const audit = project(20, {
      title: 'ISO 9001 surveillance audit', status: 'Active', department: 'Quality', owner: 'nadia',
      description: 'Prepare evidence for the external surveillance audit.',
      schema: [{ id: 'fclause', name: 'Clause', type: 'text', target: 'workItem' }],
    });
    item(audit, 'Update the document control procedure', 'Done', ['nadia'], 6, { due: -4, custom: { fclause: '7.5' } });
    item(audit, 'Collect internal audit reports', 'In Progress', ['nadia'], 0, { due: 6, custom: { fclause: '9.2' }, checklist: check('+ HR', '+ Finance', 'Operations', 'IT') });
    item(audit, 'Close open corrective actions', 'To Do', ['omar', 'faisal'], 2, { due: -2, custom: { fclause: '10.2' } });
    item(audit, 'Management review minutes', 'To Do', ['sara'], 4, { due: 14, custom: { fclause: '9.3' } });
    item(audit, 'Book the auditor visit', 'Done', ['nadia'], 9);

    const fleet = project(35, {
      title: 'Fleet GPS rollout', status: 'Active', department: 'Operations', owner: 'yousef',
      description: 'Track company vehicles in real time to cut idle time and fuel cost.',
    });
    item(fleet, 'Shortlist GPS vendors', 'Done', ['yousef'], 25, { due: -24 });
    item(fleet, 'Pilot on 10 vehicles', 'In Progress', ['yousef', 'maryam'], 2, { due: -6, checklist: check('+ Pick pilot vehicles', 'Install devices', 'Two-week review') });
    item(fleet, 'Driver briefing sessions', 'To Do', ['maryam'], 6, { due: 7 });
    item(fleet, 'Install on the remaining fleet', 'To Do', [], 6, { due: 40 });

    const payroll = project(60, {
      title: 'Payroll system migration', status: 'On Hold', department: 'Finance', owner: 'faisal',
      description: "On hold until next year's budget is approved.",
    });
    item(payroll, 'Export employee master data', 'Done', ['faisal'], 33);
    item(payroll, 'Map pay components to the new system', 'In Progress', ['faisal'], 12, { due: -20 });
    item(payroll, 'Parallel payroll run', 'To Do', [], 30);

    const renewals = project(15, {
      title: 'Client contract renewals 2027', status: 'Active', department: 'Sales', owner: 'bilal',
      description: 'Renew outsourcing contracts that expire in Q1 2027.',
      schema: [{ id: 'fstage', name: 'Stage', type: 'choice', options: ['Draft', 'Sent', 'Signed'], target: 'workItem' }],
    });
    item(renewals, 'Renewal proposal: Gulf Star Logistics', 'In Progress', ['bilal'], 1, { due: 3, custom: { fstage: 'Draft' } });
    item(renewals, 'Renewal proposal: Nadeem Facilities', 'Done', ['bilal'], 4, { custom: { fstage: 'Signed' } });
    item(renewals, 'Renewal proposal: Red Sea Hospitality', 'To Do', ['bilal', 'faisal'], 7, { due: 10 });

    const website = project(90, { title: 'Website redesign', status: 'Completed', department: 'IT', owner: 'hamid', description: 'New company website with a careers section.' });
    item(website, 'Agree the site map', 'Done', ['hamid'], 80);
    item(website, 'Build the careers section', 'Done', ['noman'], 52);
    item(website, 'Launch', 'Done', ['hamid', 'hana'], 47);

    const network = project(30, { title: 'Office network upgrade', status: 'Active', department: 'IT', owner: 'hamid', description: 'Replace the core switch and add Wi-Fi coverage in the Khobar office.' });
    item(network, 'Survey the Khobar office', 'Done', ['hana'], 20, { due: -18 });
    item(network, 'Replace the core switch', 'To Do', ['khalid'], 17, { due: -4 });
    item(network, 'Agree the maintenance window', 'To Do', ['hamid'], 3, { due: 3 });
    item(network, 'Add Wi-Fi access points', 'To Do', ['hana', 'noman'], 17, { due: 12 });

    const crm = project(70, { title: 'Recruitment CRM evaluation', status: 'Cancelled', department: 'HR', owner: 'aisha', description: 'Stopped: the current ATS will be extended instead.' });
    item(crm, 'Compare three vendors', 'Done', ['aisha'], 62);
    item(crm, 'Demo with recruiters', 'To Do', [], 64);

    return data;
  }

  function projects() {
    let data = read(KEYS.projects);
    if (!data) { data = seedProjects(); write(KEYS.projects, data); }
    return data;
  }
  const saveProjects = data => write(KEYS.projects, data);

  /* ---------- assets ---------- */
  const ASSET_CATEGORIES = [
    { name: 'Laptop', icon: 'bi-laptop' }, { name: 'Desktop', icon: 'bi-pc-display' }, { name: 'Monitor', icon: 'bi-display' },
    { name: 'Phone', icon: 'bi-phone' }, { name: 'Network', icon: 'bi-router' }, { name: 'Printer', icon: 'bi-printer' },
  ];
  const ASSET_STATUS = ['In use', 'In stock', 'In repair', 'Retired'];
  const ASSET_LOCATIONS = ['Khobar office', 'Dammam office', 'Jubail site'];

  function seedAssets() {
    const data = { assets: [], next: 1 };
    const at = days => new Date(Date.now() - days * DAY).toISOString();
    // [name, category, status, assigned to, location, bought (days ago), cost, warranty ends (days from today), notes]
    const rows = [
      ['Dell Latitude 5440', 'Laptop', 'In use', 'noman', 'Khobar office', 400, 4800, 330],
      ['Dell Latitude 7450', 'Laptop', 'In use', 'hamid', 'Khobar office', 200, 6900, 530],
      ['Lenovo ThinkPad T14', 'Laptop', 'In use', 'khalid', 'Khobar office', 1050, 5200, 20],
      ['Lenovo ThinkPad T14', 'Laptop', 'In repair', 'hana', 'Khobar office', 1000, 5200, 40, 'Battery is swelling. With the vendor under warranty.'],
      ['HP EliteBook 840', 'Laptop', 'In use', 'sara', 'Khobar office', 1130, 5600, -30],
      ['HP EliteBook 840', 'Laptop', 'In use', 'faisal', 'Khobar office', 700, 5600, 400],
      ['MacBook Air 13', 'Laptop', 'In use', 'habib', 'Khobar office', 300, 5900, 430],
      ['Dell Latitude 5440', 'Laptop', 'In use', 'bilal', 'Khobar office', 380, 4800, 350],
      ['Dell Latitude 5440', 'Laptop', 'In stock', '', 'Khobar office', 20, 4800, 1075],
      ['Dell Latitude 5440', 'Laptop', 'In stock', '', 'Khobar office', 20, 4800, 1075],
      ['Lenovo ThinkPad E14', 'Laptop', 'Retired', '', 'Khobar office', 1900, 3900, -800, 'Replaced. Data wiped.'],
      ['Dell OptiPlex 7010', 'Desktop', 'In use', 'aisha', 'Khobar office', 500, 3600, 230],
      ['Dell OptiPlex 7010', 'Desktop', 'In use', 'omar', 'Jubail site', 520, 3600, 210],
      ['Dell P2723D 27-inch', 'Monitor', 'In use', 'noman', 'Khobar office', 400, 1450, 690],
      ['Dell P2723D 27-inch', 'Monitor', 'In stock', '', 'Khobar office', 90, 1450, 1000],
      ['iPhone 15', 'Phone', 'In use', 'hamid', 'Khobar office', 330, 3700, 35],
      ['iPhone 13', 'Phone', 'In use', 'nadia', 'Khobar office', 900, 2900, -170],
      ['Samsung Galaxy A55', 'Phone', 'In use', 'yousef', 'Dammam office', 350, 1600, 15],
      ['Samsung Galaxy A55', 'Phone', 'In use', 'maryam', 'Dammam office', 350, 1600, 15],
      ['Cisco Catalyst 9300 core switch', 'Network', 'In use', '', 'Khobar office', 2200, 38000, -60, 'Out of support. Replacement is planned in the Office network upgrade project.'],
      ['Ubiquiti U6 Pro access point', 'Network', 'In stock', '', 'Khobar office', 10, 820, 720],
      ['HP LaserJet Pro 4003', 'Printer', 'In use', '', 'Dammam office', 680, 2100, 45],
    ];
    for (const [name, category, status, assignee, location, bought, cost, warranty, notes = ''] of rows) {
      const id = data.next++;
      const history = [{ at: at(bought), action: 'Added', by: 'hamid' }];
      if (assignee) history.push({ at: at(Math.max(bought - 2, 1)), action: 'Assigned', to: assignee, by: 'hamid' });
      if (status === 'In repair') history.push({ at: at(6), action: 'Sent for repair', by: 'hamid', note: notes });
      if (status === 'Retired') history.push({ at: at(120), action: 'Retired', by: 'hamid', note: notes });
      data.assets.push({ id, tag: `ESAD-IT-${String(id).padStart(4, '0')}`, name, category, serial: `SN${String(7300 + id * 37).padStart(6, '0')}`,
        status, assignee, location, purchased: inDays(-bought), cost, warranty: inDays(warranty), notes, history });
    }
    return data;
  }

  function assets() {
    let data = read(KEYS.assets);
    if (!data) { data = seedAssets(); write(KEYS.assets, data); }
    return data;
  }
  const saveAssets = data => write(KEYS.assets, data);

  return {
    ME, PEOPLE, DEPARTMENTS, KEYS, person, today, ymd, read, write, reset,
    DOC_DEPARTMENTS, DOC_TYPES, docLabel, docId, documents, saveDocuments, seedDocuments,
    PROJECT_STATUS, ITEM_STATUS, PROJECT_DEPTS, projects, saveProjects, seedProjects,
    ASSET_CATEGORIES, ASSET_STATUS, ASSET_LOCATIONS, assets, saveAssets,
  };
})();
