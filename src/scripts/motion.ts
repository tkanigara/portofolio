const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
const active = new Set<Animation>();
const seen = new WeakSet<Element>();
const traces = new WeakMap<HTMLElement, Animation[]>();
const canAnimate = typeof Element.prototype.animate === "function";
let observer: IntersectionObserver | undefined;

function animate(
  element: Element,
  frames: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  const animation = element.animate(frames, options);
  active.add(animation);
  void animation.finished
    .catch(() => {})
    .finally(() => active.delete(animation));
  return animation;
}

function observeSections() {
  if (
    !canAnimate ||
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  )
    return;
  observer = new IntersectionObserver(
    (entries) => {
      if (reducedMotion.matches) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer?.unobserve(entry.target);
        seen.add(entry.target);
        // Anchor navigation and fast scrolling must not fade content above the viewport.
        if (entry.boundingClientRect.top >= 0)
          animate(
            entry.target,
            [
              { opacity: 0.45, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 360, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
  );
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    if (!seen.has(element)) observer?.observe(element);
  });
}

function trace(diagram: HTMLElement) {
  if (!canAnimate || reducedMotion.matches) return;
  traces.get(diagram)?.forEach((animation) => animation.cancel());
  const style = getComputedStyle(diagram);
  const accent = style.getPropertyValue("--accent").trim();
  const ink = style.getPropertyValue("--diagram-ink").trim();
  const background = style.getPropertyValue("--diagram-bg").trim();
  const sequence: Animation[] = [];
  if (diagram.dataset.diagram === "mai") {
    diagram.querySelectorAll("[data-flow-stage]").forEach((stage, index) => {
      sequence.push(
        animate(
          stage,
          [
            {
              boxShadow: `inset 0 2px 0 ${accent}`,
              backgroundColor: `color-mix(in srgb, ${accent} 10%, ${background})`,
            },
            {
              boxShadow: "inset 0 0px 0 transparent",
              backgroundColor: "transparent",
            },
          ],
          { duration: 320, delay: index * 130, easing: "ease-out" },
        ),
      );
    });
  } else {
    for (const [pass, order] of [
      [0, [0, 1, 2]],
      [1, [2, 1, 0]],
    ] as const) {
      order.forEach((column, index) => {
        diagram.querySelectorAll(`[data-edge="${column}"]`).forEach((edge) => {
          sequence.push(
            animate(
              edge,
              [
                { stroke: accent, strokeOpacity: 0.95 },
                { stroke: ink, strokeOpacity: 0.22 },
              ],
              {
                duration: 280,
                delay: pass * 560 + index * 110,
                easing: "ease-out",
              },
            ),
          );
        });
      });
      const label = diagram.querySelectorAll(".training-line > span")[pass];
      if (label)
        sequence.push(
          animate(
            label,
            [
              { boxShadow: `inset 0 -1px 0 ${accent}` },
              { boxShadow: "inset 0 0px 0 transparent" },
            ],
            { duration: 480, delay: pass * 560, easing: "ease-out" },
          ),
        );
    }
  }
  traces.set(diagram, sequence);
}

const diagrams = document.querySelectorAll<HTMLElement>("[data-diagram]");
function updateMotionPreference() {
  observer?.disconnect();
  if (reducedMotion.matches) {
    active.forEach((animation) => animation.cancel());
    document.documentElement.classList.remove("intro-pending");
  } else observeSections();
  diagrams.forEach((diagram) => {
    const button = diagram.querySelector<HTMLButtonElement>(".diagram-play");
    if (button) button.hidden = reducedMotion.matches || !canAnimate;
  });
}

async function introduceHero() {
  const root = document.documentElement;
  const elements = document.querySelectorAll("[data-intro]");
  if (
    !canAnimate ||
    reducedMotion.matches ||
    location.hash ||
    !elements.length
  ) {
    root.classList.remove("intro-pending");
    return;
  }
  // Font loading can otherwise consume the whole entrance before its first visible frame.
  await Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 250)),
  ]);
  await new Promise(requestAnimationFrame);
  if (
    reducedMotion.matches ||
    document.visibilityState === "hidden" ||
    !root.classList.contains("intro-pending")
  ) {
    root.classList.remove("intro-pending");
    return;
  }
  elements.forEach((element, index) => {
    animate(
      element,
      [
        { opacity: 0, transform: "translateY(22px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 520,
        delay: index * 170,
        easing: "cubic-bezier(.2,.7,.2,1)",
        fill: "backwards",
      },
    );
  });
  root.classList.remove("intro-pending");
}
void introduceHero();
diagrams.forEach((diagram) => {
  diagram
    .querySelector(".diagram-play")
    ?.addEventListener("click", () => trace(diagram));
  diagram.addEventListener("pointerenter", (event) => {
    if (finePointer.matches && event.pointerType === "mouse") trace(diagram);
  });
});
updateMotionPreference();
reducedMotion.addEventListener("change", updateMotionPreference);
