// utils/colorExtractor.js
export const extractDominantColor = (file) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.src = URL.createObjectURL(file);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const colorCount = {};
            let maxCount = 0;
            let dominantRgb = null;

            // Sample every 10th pixel for performance
            for (let i = 0; i < imageData.length; i += 40) {
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                const a = imageData[i + 3];

                // Skip transparent or light pixels
                if (a < 255 || isColorLight(r, g, b)) continue;

                const colorKey = `${r},${g},${b}`;
                colorCount[colorKey] = (colorCount[colorKey] || 0) + 1;

                if (colorCount[colorKey] > maxCount) {
                    maxCount = colorCount[colorKey];
                    dominantRgb = { r, g, b };
                }
            }

            // If no dominant color found, generate a random one
            if (!dominantRgb) {
                dominantRgb = generateRandomColor();
            }

            resolve({
                rgb: `rgb(${dominantRgb.r}, ${dominantRgb.g}, ${dominantRgb.b})`,
                hex: rgbToHex(dominantRgb.r, dominantRgb.g, dominantRgb.b)
            });
        };
    });
};

const isColorLight = (r, g, b, threshold = 220) => {
    return r > threshold && g > threshold && b > threshold;
};

const rgbToHex = (r, g, b) => {
    return `#${[r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }).join('')}`;
};

const generateRandomColor = () => {
    return {
        r: Math.floor(Math.random() * 180),
        g: Math.floor(Math.random() * 180),
        b: Math.floor(Math.random() * 180)
    };
};