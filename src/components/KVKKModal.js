import React from 'react';
import './KVKKModal.css';

const KVKKModal = ({ isOpen, onClose, contentRef, onScroll, type }) => {
  if (!isOpen) return null;

  const getContent = () => {
    if (type === 'kvkk') {
      return `
        KİŞİSEL VERİLERİN KORUNMASI HAKKINDA AYDINLATMA METNİ
1. Veri Sorumlusu ve Temsilcisi
Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, [Şirket Adı] ("Şirketimiz") tarafından kişisel verilerin işlenmesi ve korunması ile ilgili bilgilendirme amacıyla hazırlanmıştır.

2. Kişisel Verilerin İşlenme Amaçları
Şirketimiz, kişisel verilerinizi aşağıdaki amaçlarla işlemektedir:

Hizmetlerimizin sağlanması, yürütülmesi ve geliştirilmesi,
Müşteri ilişkilerinin yönetilmesi ve iletişim faaliyetlerinin yürütülmesi,
Yasal yükümlülüklerin yerine getirilmesi,
Finansal işlemlerin gerçekleştirilmesi,
Güvenlik ve denetim süreçlerinin yürütülmesi,
Pazarlama faaliyetlerinin yürütülmesi (rızanız olması halinde).
3. İşlenen Kişisel Veriler ve Hukuki Sebepler
Şirketimiz tarafından işlenen kişisel veriler, KVKK’nın 5. ve 6. maddelerine uygun olarak aşağıdaki hukuki sebeplerle işlenmektedir:

Açık rızanızın bulunması,
Kanunlarda açıkça öngörülmesi,
Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması,
Hukuki yükümlülüklerin yerine getirilmesi,
Şirketimizin meşru menfaatleri doğrultusunda veri işlenmesinin gerekli olması.
4. Kişisel Verilerin Aktarılması
Kişisel verileriniz, hukuki yükümlülüklerimiz ve hizmet süreçlerimizin gerekliliği çerçevesinde;

Yetkili kamu kurum ve kuruluşlarına,
İş ortaklarımıza, tedarikçilerimize ve destek hizmeti sağlayıcılarımıza,
Kanunen yetkili özel hukuk tüzel kişilerine aktarılabilmektedir.
5. Kişisel Veri Toplama Yöntemi
Kişisel verileriniz, Şirketimiz tarafından elektronik ortamda, fiziki formlar, çağrı merkezi, internet sitesi, e-posta ve diğer iletişim kanalları aracılığıyla toplanmaktadır.

6. KVKK Kapsamındaki Haklarınız
KVKK’nın 11. maddesi kapsamında, Şirketimize başvurarak aşağıdaki haklarınızı kullanabilirsiniz:

Kişisel verilerinizin işlenip işlenmediğini öğrenme,
İşlenmişse buna ilişkin bilgi talep etme,
İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme,
Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,
Eksik veya yanlış işlenmişse düzeltilmesini isteme,
KVKK’ya uygun olarak silinmesini veya yok edilmesini isteme,
İşlemenin yalnızca otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
Kanuna aykırı veri işleme nedeniyle zarara uğramanız halinde tazminat talep etme.
Bu haklarınızı kullanmak için [Şirketimizin iletişim bilgileri veya başvuru kanalı] aracılığıyla bizimle iletişime geçebilirsiniz.

7. Güncellemeler ve Değişiklikler
Bu aydınlatma metni, gerekli görüldüğü takdirde güncellenebilir. Güncellenmiş versiyonlar şirketimizin internet sitesinde yayımlanacaktır.

İletişim Bilgileri:
[Şirket Adı]
[Adres]
[E-posta]
[Telefon]
      `;
    } else {
      return `
        AÇIK RIZA METNİ
[Şirket Adı] (“Şirketimiz”) tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında, kişisel verilerinizin işlenmesine ilişkin olarak bilgilendirildim.

Bu kapsamda, KVKK’nın 5. ve 6. maddeleri uyarınca; kimlik, iletişim, finans, görsel ve işitsel kayıtlar, işlem güvenliği ve pazarlama bilgileri gibi kişisel verilerimin, [Şirketin Veri İşleme Amacı (örneğin; hizmet sağlamak, pazarlama faaliyetleri yürütmek, müşteri memnuniyetini artırmak, ticari faaliyetleri geliştirmek vb.)] amaçlarıyla işlenmesine, kaydedilmesine, saklanmasına, güncellenmesine ve gerektiğinde [ilgili üçüncü kişiler, iş ortakları, tedarikçiler, yetkili kamu kurumları vb.] ile paylaşılmasına açık rızamla onay veriyorum.

Kişisel verilerimin, [elektronik ortam, yazılı formlar, çağrı merkezi, web sitesi, e-posta, mobil uygulamalar vb.] aracılığıyla toplanabileceğini ve KVKK kapsamında sahip olduğum hakları ([Şirketin internet sitesi, e-posta adresi veya iletişim bilgileri] üzerinden) kullanabileceğimi biliyorum.

Bu çerçevede, kişisel verilerimin belirtilen amaçlarla işlenmesine ve paylaşılmasına açık rızam olduğunu beyan ederim.

Ad - Soyad: _______________________
Tarih: _______________________
İmza: _______________________

















      `;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{type === 'kvkk' ? 'KVKK Aydınlatma Metni' : 'Açık Rıza Metni'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div 
          className="modal-body" 
          ref={contentRef}
          onScroll={onScroll}
        >
          <pre>{getContent()}</pre>
        </div>
      </div>
    </div>
  );
};

export default KVKKModal; 