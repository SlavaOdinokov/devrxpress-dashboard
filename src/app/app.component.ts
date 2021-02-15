import { Component, ViewChild } from '@angular/core';
import { DxDashboardControlComponent } from 'devexpress-dashboard-angular';
import { DashboardControl, DashboardControlArgs, DashboardItemBaseEventArgs } from 'devexpress-dashboard';
import { TextBoxItemEditorExtension } from 'devexpress-dashboard/designer/text-box-item-editor-extension';
import { DashboardPanelExtension, ViewerApiExtension, ItemWidgetOptionEventArgs } from 'devexpress-dashboard/common';
import notify from "devextreme/ui/notify";
import * as Model from 'devexpress-dashboard/model'

// interface DashboardInfo {
//   id: string;
//   name: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  tabContainer1 = new Model.TabContainerItem()
  page2 = new Model.DashboardTabPage()


  @ViewChild("targetDashboardControl", { static: false }) dashboardComponent: DxDashboardControlComponent

  reloadData() {
    this.dashboardComponent.instance.reloadData();
  }

  onDashboardInitialized(args) {
    let items = args.dashboard.items()
    // items.forEach(item => console.log(item.name()))

    let title = args.dashboard.dashboardJSON.Title

    // console.log(this.dashboardComponent)

    notify(args.dashboardId);
  }

  onBeforeRender(e) {
    let dashboardControl = e.component;
    dashboardControl.registerExtension(new DashboardPanelExtension(dashboardControl));
    // dashboardControl.unregisterExtension("dashboardExport");
    dashboardControl.registerExtension(new TextBoxItemEditorExtension(dashboardControl));

    // All extensions
    // console.log(dashboardControl)

    dashboardControl.option({
      extensions: {
        dashboardExport: {
          allowExportDashboard: false,
          allowExportDashboardItems: false
        }
      }
    })

    // let obj = dashboardControl.extensions[4]._viewerApi._viewerItems
    let viewerApiExtension = dashboardControl.findExtension('viewerApi')

    if(viewerApiExtension) {
      viewerApiExtension.on('itemWidgetOptionsPrepared', this.onItemWidgetOptionsPrepared)
    }

    // console.log(viewerApiExtension)
    // console.log(dashboardControl)
  }

  onItemWidgetOptionsPrepared(args) {

    if (args.itemName === 'range') {
      let margin = args.options.margin
      args.options.margin = {
        bottom: 0,
        top: 0
      }
      // console.log(args)
    }

  }

  onItemBeginUpdate(e) {
    const dashboardControl = e.component;
    const dashboard = dashboardControl.dashboard()
    console.log(e.itemName)
    if (e.itemName == "chartSalesByCategory") {
      dashboardControl.maximizeDashboardItem(e.itemName)
      // dashboard.rebuildLayout(700, 800)
      console.log(dashboard.items()[0].name())
    }

    // this.tabContainer1.tabPages()[0].name("Difference")
    // this.page2.name("Sales")
    // this.tabContainer1.tabPages.push(this.page2)
    // this.tabContainer1.tabPages()[0].componentName("tabPage1")
    // this.tabContainer1.tabPages()[1].componentName("tabPage2")

    // dashboardControl.dashboard().items.push(this.tabContainer1)
    // dashboardControl.dashboard().rebuildLayout()

    // dashboard.rebuildLayout(700, 800)
  }

  // onDashboardTitleToolbarUpdated(e) {
  //   console.log(e)
  // }

  // workingMode: string = 'Viewer';
  // dashboardId: string = 'support';
  // dashboards = [
  //   {"id": "support", "name": "Support"},
  //   {"id": "products", "name": "Products"},
  // ];
  // get workingModeText() {
  //   return 'Switch to ' + this.toggleMode(this.workingMode);
  // }
  // changeWorkingMode() {
  //   this.workingMode = this.toggleMode(this.workingMode);
  // }
  // toggleMode(mode) {
  //   return mode === 'Viewer' ? "Designer" : "Viewer";
  // }
  // onBeforeRender(args: DashboardControlArgs) {
  //   var dashboardControl = args.component;

  //   dashboardControl.registerExtension(new TextBoxItemEditorExtension(dashboardControl));
  // }


  // isPopupVisible : boolean = false;
  // dashboardId : string = 'support';
  // store : DashboardInfo[] = [
  //   {"id": "support", "name": "Support Traffic"},
  //   {"id": "products", "name": "Product Details"},
  // ];

  // showDashboardInPopup(storeItem: DashboardInfo) {
  //   this.isPopupVisible = true;
  //   this.dashboardId = storeItem.id;
  // }
}
