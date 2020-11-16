/*
 * Alan Yang
 *
 * TODO:
 *   > add transition animations for smoothness
 * 
 */

class ToggleableUIElement {
    static toggleables = {};
    constructor(id, on_display_style) {
        this.element = document.getElementById(id);
        this.on_style = on_display_style;
        this.off_style = "none";
        this.state = (this.element.style.display === this.on_style);
        ToggleableUIElement.toggleables[id] = this;
        this.set_state(this.state);
    }
    set_state(bool) {
        if (bool) {
            this.element.style.display = this.on_style;
            this.state = true;
        } else {
            this.element.style.display = this.off_style;
            this.state = false;
        }
    }
    toggle() {
        this.set_state(!this.state);
    }
}

new ToggleableUIElement("modal", "block");
new ToggleableUIElement("navbar-links", "flex");

function update_toggleable(id, action) {
    // action may have one of three values: "toggle", "on", "off"
    if (action === "toggle") {
        ToggleableUIElement.toggleables[id].toggle();
    } else if (action === "on") {
        ToggleableUIElement.toggleables[id].set_state(true);
    } else if (action === "off") {
        ToggleableUIElement.toggleables[id].set_state(false);
    }
}

window.matchMedia("(max-width: 767px)").addEventListener("change", (e) => {
    if (e.matches) {
        // viewport is 767px or less
        update_toggleable("modal", "off");
        update_toggleable("navbar-links", "off");
    } else {
        // viewport exceeds 768px
        update_toggleable("modal", "off");
        update_toggleable("navbar-links", "on");
    }
});
