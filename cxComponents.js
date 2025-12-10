var ComponentStrategy = {};

ComponentStrategy.rrrrrr = function rrrrrr() {
    return `<button style="background-color: red; color: white; border: none; padding: 10px 20px; cursor: pointer;">rrrrrr</button>`;
};
ComponentStrategy.report = function report() { return `<button id="report_01" style="background-color: red; border-radius: 8px; border: none; padding: 10px 20px; cursor: pointer;" onclick="console.log('anda bien')">report</button>`; };
ComponentStrategy.customButton = function customButton() {
  var message = 'Mensaje desde customButton';
  var title = 'Botón Personalizado';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="customButton" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">' + ComponentStrategy.escapeHtml(title) + '</button>';
};
ComponentStrategy.productFitHelp = function productFitHelp() {
  var message = 'Me das el link a Product y Fit para solicitar ayuda';
  var title = 'Product & Fit Help';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">' + ComponentStrategy.escapeHtml(title) + '</button>';
};
ComponentStrategy.manageOrder = function manageOrder() {
  var message = 'Manage Order';
  var title = 'Manage Order';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="manageOrder" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">' + ComponentStrategy.escapeHtml(title) + '</button>';
};
ComponentStrategy.manageSubscription = function manageSubscription() {
  var message = 'Manage Subscription';
  var title = 'Manage Subscription';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="manageSubscription" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">' + ComponentStrategy.escapeHtml(title) + '</button>';
};
ComponentStrategy.returnsExchanges = function returnsExchanges() {
  var message = 'Returns & Exchanges';
  var title = 'Returns & Exchanges';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="returnsExchanges" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">' + ComponentStrategy.escapeHtml(title) + '</button>';
};
ComponentStrategy.exclusiveOffers = function exclusiveOffers() {
  var message = 'Exclusive Offers';
  var title = 'Exclusive Offers';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="exclusiveOffers" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">' + ComponentStrategy.escapeHtml(title) + '</button>';
};
ComponentStrategy.productFitHelp = function productFitHelp() {
  var message = 'Me das el link a Product y Fit para solicitar ayuda';
  var title = 'Product & Fit Help';
  var subtitle = 'Me das el link a Product y Fit para solicitar ayuda';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #F7A08B; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 20px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 100%; max-width: 280px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; display: flex; flex-direction: column; align-items: flex-start;"><span style="font-weight: 500; font-size: 14px; line-height: 1.4; color: #292929; margin-bottom: 2px;">' + ComponentStrategy.escapeHtml(title) + '</span><span style="font-weight: 400; font-size: 12px; line-height: 1.4; color: #6b7280;">' + ComponentStrategy.escapeHtml(subtitle) + '</span></button>';
};
ComponentStrategy.productAndFitHelp = function productAndFitHelp() {
  var message = 'Product and Fit Help';
  var title = 'Product and Fit Help';
  var subtitle = 'Sizing tips, product details & deals';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productAndFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #ffffff; color: #292929; border: 1px solid #e5e7eb; padding: 14px; cursor: pointer; border-radius: 15px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 270px; height: 68px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; box-shadow: 0px 4px 10px 0px #CED2D980; display: flex; flex-direction: column; align-items: flex-start; gap: 6px;"><span style="font-weight: 500; font-size: 14px; line-height: 1.4; color: #292929;">' + ComponentStrategy.escapeHtml(title) + '</span><span style="font-weight: 400; font-size: 12px; line-height: 1.4; color: #6b7280;">' + ComponentStrategy.escapeHtml(subtitle) + '</span></button>';
};
ComponentStrategy.productAndFitHelp = function productAndFitHelp() {
  var message = 'Me das el link para Product y ayudas en el size';
  var title = 'Product and Fit Help';
  var subtitle = 'Sizing tips, product details & deals';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productAndFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #ffffff; color: #292929; border: 1px solid #e5e7eb; padding: 14px; cursor: pointer; border-radius: 15px; font-size: 14px; font-weight: 400; transition: all 200ms ease; text-align: left; width: 270px; height: 68px; box-sizing: border-box; font-family: inherit; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; box-shadow: 0px 4px 10px 0px #CED2D980; display: flex; flex-direction: column; align-items: flex-start; gap: 6px;"><span style="font-weight: 500; font-size: 14px; line-height: 1.4; color: #292929;">' + ComponentStrategy.escapeHtml(title) + '</span><span style="font-weight: 400; font-size: 12px; line-height: 1.4; color: #6b7280;">' + ComponentStrategy.escapeHtml(subtitle) + '</span></button>';
};
ComponentStrategy.productAndFitHelp = function productAndFitHelp() {
  var message = 'Me das el link para Product y ayudas en el size';
  var title = 'Product and Fit Help';
  var subtitle = 'Sizing tips, product details & deals';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productAndFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #ffffff; color: #292929; border: 1px solid #e5e7eb; padding: 14px; cursor: pointer; border-radius: 15px; font-size: 16px; font-weight: 600; font-family: \'Avenir Next\', sans-serif; line-height: 24px; letter-spacing: 0%; transition: all 200ms ease; text-align: left; width: 270px; height: 68px; box-sizing: border-box; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; box-shadow: 0px 4px 10px 0px #CED2D980; display: flex; flex-direction: column; align-items: flex-start; gap: 6px;"><span style="font-weight: 600; font-size: 16px; line-height: 24px; font-family: \'Avenir Next\', sans-serif; letter-spacing: 0%; color: #292929;">' + ComponentStrategy.escapeHtml(title) + '</span><span style="font-weight: 400; font-size: 14px; line-height: 18px; font-family: \'Avenir Next\', sans-serif; letter-spacing: 0%; color: #6b7280;">' + ComponentStrategy.escapeHtml(subtitle) + '</span></button>';
};
ComponentStrategy.productAndFitHelp = function productAndFitHelp() {
  var message = 'Me das el link para Product y ayudas en el size';
  var title = 'Product and Fit Help';
  var subtitle = 'Sizing tips, product details & deals';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productAndFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #ffffff; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 15px; font-size: 16px; font-weight: 600; font-family: \'Avenir Next\', sans-serif; line-height: 24px; letter-spacing: 0%; transition: all 200ms ease; text-align: left; width: 270px; height: 68px; box-sizing: border-box; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; box-shadow: 0px 4px 10px 0px #CED2D980; display: flex; flex-direction: column; align-items: flex-start; gap: 6px;"><span style="font-weight: 600; font-size: 16px; line-height: 24px; font-family: \'Avenir Next\', sans-serif; letter-spacing: 0%; color: #292929;">' + ComponentStrategy.escapeHtml(title) + '</span><span style="font-weight: 400; font-size: 14px; line-height: 18px; font-family: \'Avenir Next\', sans-serif; letter-spacing: 0%; color: #6b7280;">' + ComponentStrategy.escapeHtml(subtitle) + '</span></button>';
};
ComponentStrategy.productAndFitHelp = function productAndFitHelp() {
  var message = 'Me das el link para Product y ayudas en el size';
  var title = 'Product and Fit Help';
  var subtitle = 'Sizing tips, product details & deals';
  var escapedMessage = message.replace(/'/g, "\\'").replace(/"/g, '\\"');
  var escapedTitle = title.replace(/'/g, "\\'").replace(/"/g, '\\"');
  return '<button class="component-button" data-component="productAndFitHelp" onclick="if(window.ChatWidget && window.ChatWidget.sendMessageThroughButton) { window.ChatWidget.sendMessageThroughButton(\'' + escapedMessage + '\', \'' + escapedTitle + '\'); }" style="background-color: #ffffff; color: #292929; border: 1px solid #e5e7eb; padding: 12px 16px; cursor: pointer; border-radius: 15px; font-size: 16px; font-weight: 600; font-family: \'Avenir Next\', sans-serif; line-height: 24px; letter-spacing: 0%; transition: all 200ms ease; text-align: left; width: 270px; height: 68px; box-sizing: border-box; white-space: normal; word-wrap: break-word; overflow-wrap: break-word; box-shadow: 0px 4px 10px 0px #CED2D980; display: flex; flex-direction: column; align-items: flex-start; gap: 6px;"><span style="font-weight: 600; font-size: 16px; line-height: 24px; font-family: \'Avenir Next\', sans-serif; letter-spacing: 0%; color: #292929;">' + ComponentStrategy.escapeHtml(title) + '</span><span style="font-weight: 400; font-size: 14px; line-height: 18px; font-family: \'Avenir Next\', sans-serif; letter-spacing: 0%; color: #6b7280;">' + ComponentStrategy.escapeHtml(subtitle) + '</span></button>';
};