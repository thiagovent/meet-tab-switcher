document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({}, (tabs) => {

      const meetTabs = tabs.filter(tab => tab.url.includes("meet.google.com"));
      const tabsList = document.getElementById('tabs-list');
      if (meetTabs.length == 0) {
        const noTabs = document.createElement('span');
        noTabs.textContent=chrome.i18n.getMessage("noMeetTabs");
        tabsList.appendChild(noTabs);
      } else if (meetTabs.length == 1) {
        const tab = meetTabs[0];
        chrome.tabs.update(tab.id, { active: true });
        chrome.windows.update(tab.windowId, { focused: true });
        window.close();
      } else {
        meetTabs.forEach(tab => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');

            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.textContent = tab.active ? '\u23FA' : '\u25CB'; // \u2605 is ★ and \u2606 is ☆

            const tabTitle = document.createTextNode(tab.title || tab.url);
            link.href = "#";
            link.appendChild(icon);

            if (tab.active) {
                const strong = document.createElement("strong");
                strong.appendChild(tabTitle);
                link.appendChild(strong);
            } else {
                link.appendChild(tabTitle);
            }

            link.addEventListener('click', () => {
                chrome.tabs.update(tab.id, { active: true });
                chrome.windows.update(tab.windowId, { focused: true });
                window.close();
            });

            listItem.appendChild(link);
            tabsList.appendChild(listItem);
          });        
      }
    });
  });
  