import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  imports: [],
  templateUrl: "app.component.html",
  styleUrl: "app.component.css",
})
export class App implements OnInit {
  public ram: number | undefined = 0;
  public cores: number | undefined = 0;
  public userAgent = "unknown";
  public platform = "unknown";
  public screenInfo: any = {};
  public batteryInfo: any = {};

  ngOnInit() {
    this.ram = navigator.deviceMemory;

    this.cores = navigator.hardwareConcurrency;

    this.userAgent = navigator.userAgent;
    this.platform = navigator.platform;

    navigator.getBattery?.().then((battery: BatteryManager) => {
      console.log(battery.level, battery.charging);
      this.batteryInfo.level = battery.level;
      this.batteryInfo.charging = battery.charging;
    });

    this.screenInfo = {
      screenWidth: screen.width,
      screenHeight: screen.height,
      devicePixelRatio: window.devicePixelRatio,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  }
}
