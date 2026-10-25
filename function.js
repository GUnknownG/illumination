// Navigation Functions
function showComputation() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'none';
    document.getElementById('computation-page').style.display = 'block';
}

function showLanding() {
    document.getElementById('computation-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex';
}

function showThirdPage() {
    document.getElementById('computation-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'none';
    document.getElementById('third-page').style.display = 'block';
    calculateResultsThirdPage();
}

function showFourthPage() {
    document.getElementById('third-page').style.display = 'none';
    document.getElementById('fourth-page').style.display = 'block';
    calculateFinalResults();
}

// Modal Functions para sa Table Popup
function openTableModal() {
    document.getElementById('table-modal').style.display = 'flex';
}

function closeTableModal() {
    document.getElementById('table-modal').style.display = 'none';
}

// Input Elements
const lengthInput = document.getElementById('length-input');
const widthInput = document.getElementById('width-input');
const areaOutput = document.getElementById('area-output');

const heightInput = document.getElementById('height-input');
const workHeightInput = document.getElementById('work-height-input');
const hmOutput = document.getElementById('hm-output');

// Output Elements sa 3rd Page
const kValOutput = document.getElementById('k-val-output');
const kStatusNote = document.getElementById('k-status-note');
const interpolationSection = document.getElementById('interpolation-section');
const interpolationCalcOutput = document.getElementById('interpolation-calc-output');
const ufFinalOutput = document.getElementById('uf-final-output');

// Area & Mounting Height Computation
function calculateArea() {
    const length = parseFloat(lengthInput.value);
    const width = parseFloat(widthInput.value);
    if (!isNaN(length) && !isNaN(width)) {
        areaOutput.value = (length * width).toFixed(2);
    } else {
        areaOutput.value = '';
    }
}

function calculateHm() {
    const height = parseFloat(heightInput.value);
    const workHeight = parseFloat(workHeightInput.value);
    if (!isNaN(height) && !isNaN(workHeight)) {
        hmOutput.value = (height - workHeight).toFixed(2);
    } else {
        hmOutput.value = '';
    }
}

// Utilization Factor Table Database
const ufTable = [
    { ceiling: 0.7, wall: 0.5, floor: 0.2, values: { 0.75: 0.43, 1: 0.49, 1.25: 0.55, 1.5: 0.60, 2: 0.66, 2.5: 0.71, 3: 0.75, 4: 0.80, 5: 0.83 } },
    { ceiling: 0.7, wall: 0.3, floor: 0.2, values: { 0.75: 0.35, 1: 0.41, 1.25: 0.47, 1.5: 0.52, 2: 0.59, 2.5: 0.65, 3: 0.69, 4: 0.75, 5: 0.78 } },
    { ceiling: 0.7, wall: 0.1, floor: 0.2, values: { 0.75: 0.29, 1: 0.35, 1.25: 0.41, 1.5: 0.46, 2: 0.53, 2.5: 0.59, 3: 0.63, 4: 0.70, 5: 0.74 } },
    { ceiling: 0.5, wall: 0.5, floor: 0.2, values: { 0.75: 0.38, 1: 0.44, 1.25: 0.49, 1.5: 0.53, 2: 0.59, 2.5: 0.63, 3: 0.66, 4: 0.70, 5: 0.73 } },
    { ceiling: 0.5, wall: 0.3, floor: 0.2, values: { 0.75: 0.31, 1: 0.37, 1.25: 0.42, 1.5: 0.46, 2: 0.53, 2.5: 0.58, 3: 0.61, 4: 0.66, 5: 0.70 } },
    { ceiling: 0.5, wall: 0.1, floor: 0.2, values: { 0.75: 0.27, 1: 0.32, 1.25: 0.37, 1.5: 0.41, 2: 0.48, 2.5: 0.53, 3: 0.57, 4: 0.62, 5: 0.66 } },
    { ceiling: 0.3, wall: 0.5, floor: 0.2, values: { 0.75: 0.30, 1: 0.37, 1.25: 0.41, 1.5: 0.45, 2: 0.52, 2.5: 0.57, 3: 0.60, 4: 0.65, 5: 0.69 } },
    { ceiling: 0.3, wall: 0.3, floor: 0.2, values: { 0.75: 0.28, 1: 0.33, 1.25: 0.38, 1.5: 0.41, 2: 0.47, 2.5: 0.51, 3: 0.54, 4: 0.59, 5: 0.62 } },
    { ceiling: 0.3, wall: 0.1, floor: 0.2, values: { 0.75: 0.24, 1: 0.29, 1.25: 0.34, 1.5: 0.37, 2: 0.43, 2.5: 0.48, 3: 0.51, 4: 0.56, 5: 0.59 } }
];

const standardIndices = [0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5];

// Computation sa 3rd Page (Room Index K)
function calculateResultsThirdPage() {
    const L = parseFloat(lengthInput.value) || 0;
    const W = parseFloat(widthInput.value) || 0;
    const hm = parseFloat(hmOutput.value) || 0;

    const ceilRef = parseFloat(document.getElementById('ceiling-ref').value);
    const wallRef = parseFloat(document.getElementById('wall-ref').value);

    if (L === 0 || W === 0 || hm === 0 || (L + W) === 0) {
        kValOutput.value = "Error";
        return;
    }

    // Pormula: K = (L * W) / (hm * (L + W))
    const K = (L * W) / (hm * (L + W));
    
    // I-round off sa 2 decimal places
    const kRounded = parseFloat(K.toFixed(2));
    kValOutput.value = kRounded.toFixed(2);

    if (isNaN(ceilRef) || isNaN(wallRef)) {
        kStatusNote.innerText = "*PLEASE ENTER CEILING & WALL REFLECTANCE ON 2ND PAGE";
        kStatusNote.style.color = "red";
        interpolationSection.style.display = "none";
        return;
    }

    let matchedRow = ufTable.find(row => row.ceiling === ceilRef && row.wall === wallRef);
    
    if (!matchedRow) {
        kStatusNote.innerText = "*REFLECTANCE NOT FOUND IN TABLE";
        kStatusNote.style.color = "red";
        interpolationSection.style.display = "none";
        return;
    }

    let ufValue = null;

    // 1. Kung eksaktong nasa table ang K
    if (matchedRow.values[kRounded] !== undefined) {
        ufValue = matchedRow.values[kRounded];
        kStatusNote.innerText = "*ROOM INDEX IS IN THE TABLE";
        kStatusNote.style.color = "green";
        interpolationSection.style.display = "none";
        ufFinalOutput.value = ufValue.toFixed(4);
    } 
    // 2. Kung ang K ay mas mababa sa pinakamababa sa table (< 0.75) -> Direktang gamitin ang 0.75 value
    else if (kRounded < standardIndices[0]) {
        ufValue = matchedRow.values[standardIndices[0]];
        kStatusNote.innerText = "*ROOM INDEX IS BELOW TABLE LIMIT (USING 0.75 VALUE)";
        kStatusNote.style.color = "orange";
        interpolationSection.style.display = "none"; // Itago ang interpolation section dahil walang interpolation na magaganap
        ufFinalOutput.value = ufValue.toFixed(4);
    }
    // 3. Kung lampas sa pinakamataas (> 5) -> Gamitin ang huling value (5)
    else if (kRounded > standardIndices[standardIndices.length - 1]) {
        ufValue = matchedRow.values[standardIndices[standardIndices.length - 1]];
        kStatusNote.innerText = "*ROOM INDEX IS ABOVE TABLE LIMIT (USING 5.0 VALUE)";
        kStatusNote.style.color = "orange";
        interpolationSection.style.display = "none";
        ufFinalOutput.value = ufValue.toFixed(4);
    }
    // 4. Kung nasa pagitan (Kailangang mag-interpolate)
    else {
        kStatusNote.innerText = "*ROOM INDEX IS NOT IN TABLE (INTERPOLATING)";
        kStatusNote.style.color = "red";
        interpolationSection.style.display = "flex";

        let x1 = standardIndices[0];
        let x2 = standardIndices[1];

        for (let i = 0; i < standardIndices.length - 1; i++) {
            if (kRounded >= standardIndices[i] && kRounded <= standardIndices[i + 1]) {
                x1 = standardIndices[i];
                x2 = standardIndices[i + 1];
                break;
            }
        }

        const y1 = matchedRow.values[x1];
        const y2 = matchedRow.values[x2];

        // I-display ang x1, x2, y1, y2 sa screen
        if(document.getElementById('val-x1')) document.getElementById('val-x1').innerText = x1;
        if(document.getElementById('val-x2')) document.getElementById('val-x2').innerText = x2;
        if(document.getElementById('val-y1')) document.getElementById('val-y1').innerText = y1;
        if(document.getElementById('val-y2')) document.getElementById('val-y2').innerText = y2;

        // Linear Interpolation Formula
        ufValue = y1 + ((kRounded - x1) / (x2 - x1)) * (y2 - y1);

        interpolationCalcOutput.value = ufValue.toFixed(4);
        ufFinalOutput.value = ufValue.toFixed(4);
    }
}

// Final Computation sa 4th Page
function calculateFinalResults() {
    const E = parseFloat(document.getElementById('illuminance-input').value) || 0;
    const A = parseFloat(document.getElementById('area-output').value) || 0;
    const phi = parseFloat(document.getElementById('luminous-flux-input').value) || 0;
    const n = parseFloat(document.getElementById('n-lamp-input').value) || 1; 
    const eta = parseFloat(document.getElementById('eta-input').value) || 0.85;
    const uf = parseFloat(document.getElementById('uf-final-output').value) || 0;
    const P = parseFloat(document.getElementById('wattage-input').value) || 0;

    let denominator = n * phi * eta * uf;
    let N = 0;
    if (denominator > 0) {
        N = (E * A) / denominator;
    }

    const nRoundedUp = Math.ceil(N);
    
    document.getElementById('n-output').value = N.toFixed(2) + " ~ " + nRoundedUp;

    let UPD_actual = 0;
    let UPD_rounded = 0;
    if (A > 0) {
        UPD_actual = (P * N) / A;
        UPD_rounded = (P * nRoundedUp) / A;
    }

    document.getElementById('upd-output').value = UPD_actual.toFixed(2) + " ~ " + UPD_rounded.toFixed(2);
}

// Complete Function
function completeCalculation() {
    alert('Computation completed successfully!');
    resetCalculator();
    showLanding();
}

// Reset Function
function resetCalculator() {
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        if(input.id !== 'eta-input') {
            input.value = '';
        }
    });
}

// Event Listeners
if (lengthInput && widthInput) {
    lengthInput.addEventListener('input', calculateArea);
    widthInput.addEventListener('input', calculateArea);
}

if (heightInput && workHeightInput) {
    heightInput.addEventListener('input', calculateHm);
    workHeightInput.addEventListener('input', calculateHm);
}
// Function para i-check at ipakita ang fake ad pagka-load ng site
window.addEventListener('DOMContentLoaded', () => {
    // Kung hindi pa nila nakikita o natatapos ang session, ipalabas ang ad
    if (!sessionStorage.getItem('adShown')) {
        document.getElementById('fake-ad-modal').style.display = 'flex';
    }
});

// Pagsara ng Ad kapag clinick ang 'X' o 'OK' button
function closeAdModal() {
    document.getElementById('fake-ad-modal').style.display = 'none';
    sessionStorage.setItem('adShown', 'true'); // Para hindi na ulit lumabas habang nag-aapp sila
}

if(document.getElementById('close-ad-btn')) {
    document.getElementById('close-ad-btn').addEventListener('click', closeAdModal);
}

if(document.getElementById('ok-ad-btn')) {
    document.getElementById('ok-ad-btn').addEventListener('click', closeAdModal);
}