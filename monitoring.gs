const prop = PropertiesService.getScriptProperties();
const site_list = JSON.parse(prop.getProperty('site_list'));
const mail = prop.getProperty('mail');

const monitoring = () => {
  site_list.forEach(
    site => {
      console.log(site);
      check_url(site)
    }
  );
}

const check_url = (siteURL) => {
  try {
    var response = UrlFetchApp.fetch(siteURL, { muteHttpExceptions:true });
    var code = response.getResponseCode();
    console.log('response : ' + code);
    if( code != 200 ){
      MailApp.sendEmail(
        mail,
        "[死活監視] レスポンス : " + code + " : " + siteURL,
        "[死活監視] レスポンス : " + code + " : " + siteURL
      );  
    }else{
      /*
      MailApp.sendEmail(
        mail,
        "[死活監視] レスポンス : " + code + " : " + siteURL,
        "[死活監視] レスポンス : " + code + " : " + siteURL
      ); 
      */
    }
  } catch(err) {
    console.log('error : ');
    console.log(err);
    MailApp.sendEmail(
      mail,
      "[死活監視] 検証URLに接続できません : " + siteURL,
      err
    );  
  }

}