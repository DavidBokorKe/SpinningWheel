document.addEventListener("DOMContentLoaded", function() {

    const initialItems = ["1", "2"]; // Initialize your items data here if needed

    const whContainerHeight = document.getElementById('wheel-container').clientHeight;
    const Circumference = whContainerHeight * Math.PI;

    const itemCount = initialItems.length;

    const arcPerc = 100 / itemCount;
    const deg = 360 * (arcPerc / 100);
    const takenColor = [];

    function createItem(data, i) {
        const randColor = data ? data.color : '#' + Math.floor(Math.random() * 16777215).toString(16);
        const item = document.createElement('span');
        item.classList.add('item');
        item.style.backgroundColor = randColor;
        item.style.transform = `rotate(${(i * deg) + 45}deg)`;
        item.innerHTML = `<b><span>${data ? data.text : 'Text ' + (i + 1)}</span></b>`;
        return item;
    }

    const wheel = document.getElementById('wheel');

    for (let i = 0; i < itemCount; i++) {
        const item = createItem(initialItems[i], i);
        wheel.appendChild(item);
    }

    if (itemCount > 1) {
        const poly = ["50% 50%", "0% 0%"];
        for (let i = 0; ; i++) {
            if (arcPerc <= 100) {
                poly.push(`${i === 2 ? "100%" : "0%"} ${arcPerc}%`);
                break;
            } else {
                poly.push(`${i === 1 ? "100%" : "0%"} 100%`);
                arcPerc -= 100;
            }
        }

        const wheelItems = document.querySelectorAll('#wheel .item');
        wheelItems.forEach(item => {
            item.style.clipPath = `polygon(${poly.join(',')})`;
        });
    }

    initialItems.forEach((data, i) => {
        const item = createItem(data, i);
        wheel.appendChild(item);
        item.querySelector('.rem-item').addEventListener('click', () => rem_item(item));
        item.querySelector('input').focus();
    });

    const itemForm = document.querySelector('#item-form');
    const itemFormLabels = itemForm.querySelectorAll('.item-label');
    itemFormLabels.forEach(label => {
        label.querySelector('.rem-item').addEventListener('click', () => rem_item(label));
    });

    itemForm.addEventListener('submit', e => {
        e.preventDefault();
        const items = Array.from(itemForm.querySelectorAll('[name="item_text"]')).map(input => {
            const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            return input.value.trim() !== '' ? { 'color': randColor, text: input.value } : null;
        }).filter(Boolean);

        // Process items array as needed, e.g., save it to variables
        // if (items.length > 0) {
        //     alert("Wheel Items successfully saved.");
        // }
        // Do not reload the page
    });

    document.getElementById('spin').addEventListener('click', () => {
        const min = 2000;
        const max = 5000;
        const degree = Math.floor(Math.random() * (max - min)) + min;
        document.getElementById('wheel').style.transform = `rotate(${degree}deg)`;
    });
});

function rem_item(element) {
    const itemFormLabels = document.querySelectorAll('#item-form .item-label');
    if (itemFormLabels.length === 1) {
        itemFormLabels[0].querySelector('input').value = '';
        itemFormLabels[0].querySelector('input').focus();
    } else {
        element.remove();
    }
}
