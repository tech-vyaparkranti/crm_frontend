import api from "../../../../api/api";

export const downloadFile = async (type: 'pdf' | 'excel') => {
    console.log(type,'ttt');
  try {
    const res = await api.get(`/api/leads/export/${type}`, {
  responseType: 'blob',
  headers: {
    Accept:
      type === 'pdf'
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
});

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'pdf' ? 'leads.pdf' : 'leads.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error('Failed to download:', error);
  }
};
