import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  imports: [],
  templateUrl: "app.component.html",
  styleUrl: "app.component.css",
})
export class App implements OnInit {
  public ram: number | undefined = -1;
  public cores: number | undefined = -1;
  public userAgent = "unknown";
  public platform = "unknown";
  public screenInfo: any = {};
  public batteryInfo: any = {};

  loading = false;
  result: number | null = null;

  ngOnInit() {
    this.ram = navigator.deviceMemory;
    this.cores = navigator.hardwareConcurrency;

    this.userAgent = navigator.userAgent;
    this.platform = navigator.platform;

    navigator.getBattery?.().then((battery: BatteryManager) => {
      console.log(battery.level, battery.charging);
      this.batteryInfo.level = battery.level * 100;
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

  runBenchmark(): void {
    this.loading = true;
    this.result = null;

    setTimeout(() => {
      const score = this.runCpuBenchmark(10_000_000);
      this.result = parseFloat((100000 / score).toFixed(2));
      this.loading = false;
    });
  }

  private runCpuBenchmark(iterations: number): number {
    const start = performance.now();
    let count = 0;

    for (let i = 2; i < iterations; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) count++;
    }

    return performance.now() - start;
  }
}
