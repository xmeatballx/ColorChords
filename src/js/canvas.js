import {state} from './state.js'
import {pubsub} from './pubsub.js'

export const drawCanvas = () => {
    const canvas = document.querySelector("#main-canvas");
    let offset, radius;
    if (window.innerWidth < 768) {
        canvas.width = 300;
        canvas.height = 300;
        offset = 119;
        radius = 15;
    } else {
        canvas.width = 512;
        canvas.height = 512;
        offset = 204;
        radius = 25;
    }
    canvas.width = canvas.height *
        (canvas.clientWidth / canvas.clientHeight);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    const image = document.querySelector("#colorwheel")
    ctx.drawImage(image,0,0,canvas.width,canvas.height)
    state.notes.forEach((note, i) => {
        const x = canvas.width / 2 + Math.sin(Math.PI * 2 * note.interval + (state.transpose / 180 * Math.PI)) * offset * note.velocity
        const y = canvas.height/2 + Math.cos(Math.PI * 2 *note.interval+(state.transpose/180*Math.PI)) * offset * note.velocity
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.lineWidth = 3;

        let col = ctx.getImageData(x, y, 1, 1);
        col.data[0] += note.octave*50
        col.data[1] += note.octave * 50
        col.data[2] += note.octave * 50
        state.notes[i].color = `rgb(${col.data[0]}, ${col.data[1]}, ${col.data[2]} )`;
        ctx.fillStyle = state.notes[i].color;
        ctx.fill();

        ctx.strokeStyle = `rgb(179,179,179)`
        ctx.stroke();

        const colorPreviews = document.querySelectorAll(".color_preview")
        colorPreviews[i].style.backgroundColor = state.notes[i].color;
    })
}