import { LOGO_URL } from "@/lib/logo";

export type PrintData = {
  habits: string[];
  plan: { goal: string; action: string; done: boolean; note: string }[];
  recovery: string[];
  today: string;
  people: string[];
  pledge: string;
};

const HABIT_Q = ["Tôi thường dùng mạng xã hội vào thời điểm nào?", "Tôi thường kiểm tra thông báo khi nào?", "Việc dùng thiết bị có ảnh hưởng đến giấc ngủ, sự tập trung hoặc thời gian nghỉ ngơi không?", "Thói quen số nào tôi muốn điều chỉnh?", "Một thay đổi nhỏ tôi muốn thử là gì?"];
const PRESSURE = ["Áp lực học tập, điểm số", "So sánh bản thân trên mạng xã hội", "Thiếu ngủ, mệt mỏi", "Bình luận gây tổn thương", "Quá tải thông tin, thông báo liên tục"];
const PROTECT = ["Vận động, đi bộ", "Sở thích của bản thân", "Gia đình", "Bạn bè", "Giáo viên đáng tin cậy"];
export const PRINT_RECOVERY = ["Đi bộ hoặc vận động", "Nghe nhạc", "Đọc sách", "Viết nhật ký", "Làm việc yêu thích", "Trò chuyện với người tin cậy", "Nghỉ ngơi và điều chỉnh giấc ngủ", "Tạm rời màn hình", "Thực hành hít thở chậm, nhẹ nhàng"];
const QUOTE = "“Hiểu mình không phải là tự trách bản thân. Đó là nhận ra điều gì đang tạo áp lực, điều gì giúp mình vững vàng và khi nào mình cần một điểm tựa.”";

const Box = ({ checked }: { checked?: boolean }) => <span className="pn-box" aria-hidden="true">{checked ? "✓" : ""}</span>;
function Lines({ text = "", n }: { text?: string; n: number }) {
  return <div className="pn-write">{text && <p className="pn-filled">{text}</p>}{Array.from({ length: Math.max(n - (text ? Math.ceil(text.length / 80) : 0), 1) }, (_, i) => <div key={i} className="pn-line" />)}</div>;
}
function Head({ n, title }: { n: number; title: string }) {
  return <header className="pn-head"><span className="pn-num">{n}</span><h2>{title}</h2></header>;
}

export function PrintNotebook({ data }: { data: PrintData }) {
  const recoveryMatch = (r: string) => data.recovery.some((x) => x.toLowerCase().startsWith(r.toLowerCase().slice(0, 10)));
  return (
    <div className="pn-doc">
      <section className="pn-page pn-cover">
        <img src={LOGO_URL} alt="Logo 5 CHẠM" className="pn-logo" />
        <p className="pn-model">Mô hình 5 CHẠM – VỮNG VÀNG TÂM LÝ</p>
        <h1>SỔ TAY CHĂM SÓC BẢN THÂN</h1>
        <p className="pn-sub">Hiểu mình – Cân bằng không gian số – Vững vàng tâm lý</p>
        <div className="pn-rule" />
        <p className="pn-quote">“Chăm sóc bản thân bắt đầu từ việc lắng nghe chính mình.”</p>
        <div className="pn-fields">
          {["Tên hoặc biệt danh (nếu muốn)", "Lớp (nếu muốn)", "Ngày bắt đầu thực hành"].map((f) => <div key={f} className="pn-field"><span>{f}:</span><span className="pn-line pn-grow" /></div>)}
        </div>
        <p className="pn-school">Trường THPT Tây Tiền Hải</p>
      </section>

      <section className="pn-page">
        <Head n={1} title="Hướng dẫn sử dụng" />
        <ul className="pn-guide">
          <li>Sổ tay là công cụ tự suy ngẫm, <strong>không phải bài kiểm tra tâm lý</strong>.</li>
          <li>Không có câu trả lời đúng hoặc sai.</li>
          <li>Bạn có thể bỏ qua câu hỏi không muốn trả lời.</li>
          <li>Bạn không cần chia sẻ nội dung cá nhân với người khác.</li>
          <li>Mỗi thay đổi nhỏ, vừa sức đều đáng ghi nhận.</li>
        </ul>
        <div className="pn-avoid pn-section">
          <Head n={2} title="Thói quen số của tôi" />
          {HABIT_Q.map((q, i) => <div key={q} className="pn-q"><p className="pn-qt">{q}</p><Lines text={data.habits[i]} n={3} /></div>)}
        </div>
      </section>

      <section className="pn-page">
        <Head n={3} title="Nhận diện áp lực và nguồn lực bảo vệ" />
        <p className="pn-note">Đánh dấu điều phù hợp với bạn và viết thêm. Không tính điểm, không tính điểm nguy cơ trầm cảm.</p>
        <div className="pn-two">
          {[["Điều có thể tạo áp lực cho tôi", PRESSURE], ["Điều giúp tôi cảm thấy vững vàng hơn", PROTECT]].map(([t, items]) => (
            <div key={t as string} className="pn-card">
              <h3>{t as string}</h3>
              {(items as string[]).map((x) => <p key={x} className="pn-check"><Box />{x}</p>)}
              <p className="pn-check"><Box />Khác:</p>
              <Lines n={3} />
            </div>
          ))}
        </div>
      </section>

      <section className="pn-page">
        <Head n={4} title="Kế hoạch sử dụng Internet cân bằng trong 7 ngày" />
        <table className="pn-table">
          <thead><tr><th>Ngày</th><th>Mục tiêu nhỏ</th><th>Hành động tôi sẽ thử</th><th>Xong</th><th>Điều tôi nhận thấy</th></tr></thead>
          <tbody>{data.plan.map((d, i) => <tr key={i}><td className="pn-day">{i + 1}</td><td>{d.goal}</td><td>{d.action}</td><td className="pn-center"><Box checked={d.done} /></td><td>{d.note}</td></tr>)}</tbody>
        </table>
        <p className="pn-note">Không bắt buộc hoàn thành đủ 7 ngày.</p>
      </section>

      <section className="pn-page">
        <Head n={5} title="Điều giúp tôi hồi phục" />
        <div className="pn-chips">{PRINT_RECOVERY.map((r) => <p key={r} className="pn-chip"><Box checked={recoveryMatch(r)} />{r}</p>)}</div>
        {[["Hoạt động tôi muốn thử", data.today], ["Khi nào tôi sẽ thực hiện?", ""], ["Tôi cần chuẩn bị điều gì?", ""]].map(([q, t]) => <div key={q} className="pn-q"><p className="pn-qt">{q}</p><Lines text={t} n={2} /></div>)}
        <div className="pn-avoid pn-section">
          <Head n={6} title="Những người tôi có thể tìm đến" />
          <p className="pn-note">Ghi vai trò hoặc tên: người thân, bạn bè, giáo viên chủ nhiệm, người có chuyên môn… Không bắt buộc ghi số điện thoại hay địa chỉ.</p>
          {Array.from({ length: Math.max(5, data.people.length) }, (_, i) => <div key={i} className="pn-field"><span>{i + 1}.</span>{data.people[i] ? <span className="pn-filled pn-grow pn-under">{data.people[i]}</span> : <span className="pn-line pn-grow" />}</div>)}
        </div>
      </section>

      <section className="pn-page">
        <Head n={7} title="Cam kết nhỏ với bản thân" />
        {[["Trong 24 giờ tới, tôi sẽ thử…", data.pledge], ["Khi gặp khó khăn, tôi có thể…", ""], ["Một điều tôi trân trọng ở bản thân là…", ""]].map(([q, t]) => <div key={q} className="pn-q"><p className="pn-qt">{q}</p><Lines text={t} n={3} /></div>)}
        <blockquote className="pn-final">{QUOTE}</blockquote>
        <p className="pn-school">5 CHẠM – VỮNG VÀNG TÂM LÝ · Trường THPT Tây Tiền Hải</p>
      </section>
    </div>
  );
}
