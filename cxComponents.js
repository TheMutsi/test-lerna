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