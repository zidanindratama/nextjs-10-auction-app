export const convertToRupiah = (angkaFloat: number | null) => {
  const angkaString: string = angkaFloat?.toString() as string;
  // Format angka menjadi string dan pisahkan dengan titik setiap 3 digit
  const rupiah = angkaString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "Rp " + rupiah;
};
