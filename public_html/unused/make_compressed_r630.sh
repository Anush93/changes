rm pqjs/pq_strnfy_r630_web.js
pq_webpage_compress home.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress dash_vlan.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress dash_sdas.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress link_util_app.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ses_sessions.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress shadow_session_watch.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ses_sources.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress shadow_server_watch.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress shadow_url_watch.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ses_dest.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ses_app.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ses_serv.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress traffic_diag.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rule_add.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_addr_ad.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_addr_dhcp.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_addr_ip.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_addr_mac.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_addr_prof.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_app.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_app_list.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_pipe_schedules.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_sched.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_serv.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_serv_list.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_pipes.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_url.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress obj_url_list.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rule_mon.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress quota_rules.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress quota_app_profiles.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress quota_profiles.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress quota_usage.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress bw_history.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress reports.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_bw.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_summary.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_sources.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_sources_det.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_dests.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_dests_det.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_apps.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_apps_det.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_ports.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress rep_ports_det.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress profile.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ldap_server.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress dhcp_server.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress management_r630.html >> pqjs/pq_strnfy_r630_web.js

cp management_r630.html temp/management.html
cd temp/ && pq_webpage_compress management.html >> ../pqjs/pq_strnfy_r630_web.js
cd ../

pq_webpage_compress config.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress maintenance.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress system_update.html >> pqjs/pq_strnfy_r630_web.js
pq_webpage_compress ele_pqpie_label.html >> pqjs/pq_strnfy_r630_web.js

cd pqjs/ && ./cmpressPq_js_r630.sh 
cd ../pqcss/ && ./cmppqcss.sh 