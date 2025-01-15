import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { HaloPosition } from "./ngx-halo.types";

@Component({
  selector: "om-halo",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-halo.component.html",
  styleUrl: "./ngx-halo.component.scss",
})
export class NgxHaloComponent implements OnDestroy, AfterViewInit {
  @ViewChild("OmHaloElement", { static: false })
  private haloElement!: ElementRef<HTMLDivElement>;

  @ViewChild("OmHaloCircle", { static: false })
  private circleElement!: ElementRef<HTMLDivElement>;

  @Input()
  styleClass?: string;

  @Input()
  position: HaloPosition = "center";

  @Input()
  animate = true;

  @Input()
  interactive = true;

  @Input("haloSize")
  set haloSize(size: string) {
    this.style["--om-halo-circle-size"] = size;
  }

  @Input("haloColors")
  set haloColors(colors: string) {
    this.style["--om-halo-circle-colors"] = colors;
  }

  @Input("haloShadow")
  set haloShadow(shadow: string) {
    this.style["--om-halo-circle-shadow"] = shadow;
  }

  style: any = {};

  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private animationFrameId: number | null = null;

  private intersectionObserver?: IntersectionObserver;
  isInView = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
      if (this.interactive) {
        this.setupEventListeners();
      }
    }
  }

  ngOnDestroy(): void {
    this.intersectionObserver?.disconnect();
    this.removeEventListeners();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      const wasInView = this.isInView;
      this.isInView = entry.isIntersecting;

      if (wasInView !== this.isInView) {
        this.cdr.detectChanges();
      }
    });
    this.intersectionObserver.observe(this.haloElement.nativeElement);
  }

  private setupEventListeners(): void {
    const element = this.haloElement.nativeElement;
    element.addEventListener("mousemove", this.onMouseMove);
    element.addEventListener("mouseenter", this.onMouseEnter);
    element.addEventListener("mouseleave", this.onMouseLeave);
  }

  private removeEventListeners(): void {
    const element = this.haloElement.nativeElement;
    element.removeEventListener("mousemove", this.onMouseMove);
    element.removeEventListener("mouseenter", this.onMouseEnter);
    element.removeEventListener("mouseleave", this.onMouseLeave);
  }

  private onMouseMove = (event: MouseEvent): void => {
    const rect = this.haloElement.nativeElement.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    this.targetX = event.clientX - rect.left - centerX;
    this.targetY = event.clientY - rect.top - centerY;

    this.circleElement.nativeElement.classList.remove("animate");

    if (!this.animationFrameId) {
      this.animateCircle();
    }
  };

  private animateCircle(): void {
    const delayFactor = 0.03;
    this.currentX += (this.targetX - this.currentX) * delayFactor;
    this.currentY += (this.targetY - this.currentY) * delayFactor;

    this.haloElement.nativeElement.style.setProperty(
      "--halo-x-offset",
      `${this.currentX / 10 + 50}%`,
    );
    this.haloElement.nativeElement.style.setProperty(
      "--halo-y-offset",
      `${this.currentY / 10 + 50}%`,
    );
    this.circleElement.nativeElement.style.transform = `translate(${this.currentX / 20}px, ${this.currentY / 20}px)`;

    this.animationFrameId = requestAnimationFrame(() => this.animateCircle());
  }

  private onMouseEnter = (): void => {
    cancelAnimationFrame(this.animationFrameId!);
    this.animationFrameId = null;
  };

  private onMouseLeave = (): void => {
    this.returnToCenter();
  };

  private returnToCenter(): void {
    const returnToCenterAnimation = () => {
      this.targetX = 0;
      this.targetY = 0;

      this.currentX += (this.targetX - this.currentX) * 0.03;
      this.currentY += (this.targetY - this.currentY) * 0.03;

      this.haloElement.nativeElement.style.setProperty(
        "--halo-x-offset",
        `${this.currentX / 10 + 50}%`,
      );
      this.haloElement.nativeElement.style.setProperty(
        "--halo-y-offset",
        `${this.currentY / 10 + 50}%`,
      );
      this.circleElement.nativeElement.style.transform = `translate(${this.currentX / 20}px, ${this.currentY / 20}px)`;

      if (Math.abs(this.currentX) < 0.1 && Math.abs(this.currentY) < 0.1) {
        cancelAnimationFrame(this.animationFrameId!);
        this.animationFrameId = null;
        this.currentX = 0;
        this.currentY = 0;
        if (this.animate && this.isInView) {
          this.circleElement.nativeElement.classList.add("animate");
        }
        return;
      }

      this.animationFrameId = requestAnimationFrame(returnToCenterAnimation);
    };

    cancelAnimationFrame(this.animationFrameId!);
    returnToCenterAnimation();
  }
}
