import api from "../../../../api/api";

export const downloadOrganization = async () => {
  try {
    const res = await api.get('/api/export-users', {
      responseType: 'blob',
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });

    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'org_user.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error('Failed to download:', error);
  }
};
