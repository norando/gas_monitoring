const sample_set_prop = () => {
  const sample_site_list = [
  'https://norando.net',
  'https://example.com/'
];

  prop.setProperties({
    'line_notify_token': 'hogehoge',
    'mail': 'sample@example.com',
    'site_list': JSON.stringify(site_list),
    'label': 'hoge'
  });

}

const sample_check = () => {
  const site_list = JSON.parse(prop.getProperty('site_list'));
  const mail = prop.getProperty('mail');
  const line_notify_token = prop.getProperty('line_notify_token');

  console.log(site_list);
  console.log(mail);
  console.log(line_notify_token);
}