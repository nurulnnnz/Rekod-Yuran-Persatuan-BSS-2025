// Cek jika ada data pembayaran yang disimpan dalam LocalStorage
let pembayaranList = JSON.parse(localStorage.getItem('pembayaranList')) || [];

// Fungsi untuk mengemaskini senarai pembayaran dalam bentuk jadual
function kemaskiniSenarai() {
    const senaraiPembayaran = document.getElementById("senaraiPembayaran").getElementsByTagName('tbody')[0];
    senaraiPembayaran.innerHTML = "";

    pembayaranList.forEach(pembayaran => {
        const row = senaraiPembayaran.insertRow();
        row.innerHTML = `
            <td>${pembayaran.nama}</td>
            <td>${pembayaran.noRumah}</td>
            <td>${pembayaran.noTelefon}</td>
            <td>${pembayaran.tarikhBayar}</td>
            <td>${pembayaran.amaunBayaran}</td>
        `;
    });
}

// Event listener untuk menangani borang
document.getElementById("ahliForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Ambil data dari input
    const nama = document.getElementById("nama").value;
    const noRumah = document.getElementById("noRumah").value;
    const noTelefon = document.getElementById("noTelefon").value;
    const tarikhBayar = document.getElementById("tarikhBayar").value;
    const amaunBayaran = document.getElementById("amaunBayaran").value;

    // Simpan data pembayaran dalam array
    pembayaranList.push({ nama, noRumah, noTelefon, tarikhBayar, amaunBayaran });

    // Simpan data ke LocalStorage
    localStorage.setItem('pembayaranList', JSON.stringify(pembayaranList));

    // Kosongkan borang
    document.getElementById("ahliForm").reset();

    // Kemaskini senarai pembayaran dalam jadual
    kemaskiniSenarai();
});

// Fungsi untuk memuat turun senarai dalam format Excel
document.getElementById("downloadExcel").addEventListener("click", function() {
    const ws = XLSX.utils.table_to_sheet(document.getElementById("senaraiPembayaran"));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pembayaran Yuran");
    XLSX.writeFile(wb, "Senarai_Pembayar_Yuran.xlsx");
});

// Fungsi untuk reset data (hapuskan semua data pembayaran)
document.getElementById("resetData").addEventListener("click", function() {
    // Kosongkan pembayaranList dan LocalStorage
    pembayaranList = [];
    localStorage.removeItem('pembayaranList');

    // Kemaskini senarai pembayaran dalam jadual
    kemaskiniSenarai();
});

// Kemaskini senarai apabila halaman dimuat semula
kemaskiniSenarai();
