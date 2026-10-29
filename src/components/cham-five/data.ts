export type Supporter = { id: string; name: string; desc: string; when?: string; opener?: string; note?: string; fallback?: boolean };
export type SupportGroup = { id: string; title: string; lead: string; people: Supporter[]; note?: string };

export const GROUPS: SupportGroup[] = [
  {
    id: "gia-dinh",
    title: "ĐIỂM TỰA GIA ĐÌNH",
    lead: "Đôi khi, một cuộc trò chuyện chân thành với người thân có thể là bước đầu tiên để bạn cảm thấy nhẹ lòng hơn.",
    note: "Nếu em chưa cảm thấy an toàn khi chia sẻ với một người thân, em có thể lựa chọn một điểm tựa khác mà mình tin tưởng.",
    people: [
      { id: "bo-me", name: "Bố hoặc mẹ", desc: "Người thường hiểu hoàn cảnh và thói quen hằng ngày của em.", when: "Khi em thấy áp lực, buồn kéo dài hoặc có chuyện khó nói ở trường hay ở nhà.", opener: "Dạo này con cảm thấy khá áp lực. Con muốn có người lắng nghe một chút. Mình có thể nói chuyện với nhau được không?" },
      { id: "ong-ba", name: "Ông bà hoặc người thân đáng tin cậy", desc: "Một người lớn trong gia đình khiến em thấy bình yên và được che chở.", when: "Khi em cần một người lớn lắng nghe nhẹ nhàng, hoặc chưa sẵn sàng nói với bố mẹ.", opener: "Dạo này cháu thấy trong lòng có nhiều chuyện. Cháu muốn được nói chuyện với ông/bà một chút được không ạ?" },
      { id: "anh-chi", name: "Anh chị hoặc người thân em thấy an toàn khi chia sẻ", desc: "Người gần tuổi, dễ hiểu những áp lực học tập và bạn bè của em.", when: "Khi em muốn chia sẻ thoải mái hơn, hoặc cần người cùng em nói chuyện với bố mẹ.", opener: "Dạo này em cảm thấy khá áp lực. Em muốn có người lắng nghe một chút. Anh/chị có thể nói chuyện với em được không?" },
    ],
  },
  {
    id: "nha-truong",
    title: "ĐIỂM TỰA NHÀ TRƯỜNG",
    lead: "Nhà trường có nhiều người có thể đồng hành cùng em. Hãy bắt đầu từ người mà em cảm thấy tin tưởng, dễ chia sẻ và an toàn nhất.",
    people: [
      { id: "ban-be", name: "Bạn bè đáng tin cậy", desc: "Một người bạn biết lắng nghe, tôn trọng cảm xúc và sẵn sàng cùng em tìm sự giúp đỡ khi cần.", opener: "Dạo này mình có nhiều chuyện khó nói. Cậu có thể dành cho mình một chút thời gian được không?", note: "Bạn bè có thể lắng nghe và đồng hành nhưng không phải chịu trách nhiệm giải quyết mọi vấn đề tâm lý của nhau. Nếu vấn đề nghiêm trọng hoặc liên quan đến an toàn, cần tìm người lớn đáng tin cậy." },
      { id: "gvcn", name: "Giáo viên chủ nhiệm", desc: "Người có thể hỗ trợ em trao đổi về những khó khăn trong học tập, quan hệ bạn bè và cuộc sống ở trường; đồng thời giúp kết nối với nguồn hỗ trợ phù hợp.", opener: "Thưa cô/thầy, gần đây em đang gặp một số khó khăn và muốn xin cô/thầy một buổi trao đổi riêng." },
      { id: "thay-co", name: "Thầy cô giáo mà em tin tưởng", desc: "Em có thể tìm đến một thầy cô khiến mình cảm thấy được tôn trọng, lắng nghe và không bị phán xét.", opener: "Thưa cô/thầy, em có một chuyện đang khiến em lo lắng. Cô/thầy có thể lắng nghe em một chút được không ạ?" },
      { id: "doan", name: "Đoàn trường", desc: "Có thể hỗ trợ kết nối học sinh với các hoạt động giáo dục kỹ năng, hoạt động tập thể và những người có trách nhiệm trong nhà trường khi cần.", opener: "Em muốn tìm hiểu nơi có thể chia sẻ hoặc xin hỗ trợ khi học sinh gặp khó khăn tâm lý. Em nên liên hệ với ai ạ?" },
      { id: "y-te", name: "Nhân viên y tế trường học", desc: "Có thể tiếp nhận những chia sẻ ban đầu liên quan đến sức khỏe, hướng dẫn chăm sóc sức khỏe trong phạm vi chuyên môn và hỗ trợ kết nối với người có trách nhiệm hoặc cơ sở chuyên môn phù hợp khi cần.", opener: "Cô/chú có thể hướng dẫn em tìm nơi hỗ trợ phù hợp khi gần đây em thường xuyên cảm thấy mệt mỏi và căng thẳng được không ạ?", note: "Nhân viên y tế trường học không phải là chuyên gia tâm lý; sự hỗ trợ nằm trong vai trò và phạm vi chuyên môn thực tế." },
      { id: "tu-van", name: "Cán bộ tư vấn tâm lý học đường – nếu nhà trường có bố trí", desc: "Nếu nhà trường có cán bộ hoặc bộ phận phụ trách tư vấn tâm lý học đường, em có thể tìm hiểu cách đăng ký trao đổi riêng và quy trình tiếp nhận hỗ trợ.", note: "Tìm hiểu đầu mối hỗ trợ hiện có tại nhà trường", fallback: true },
    ],
  },
  {
    id: "chuyen-mon",
    title: "KHI CẦN HỖ TRỢ CHUYÊN SÂU HƠN",
    lead: "Nếu những khó khăn kéo dài, ảnh hưởng đáng kể đến học tập, sinh hoạt hoặc khả năng chăm sóc bản thân, em nên trao đổi với người lớn đáng tin cậy để được kết nối với cơ sở y tế hoặc chuyên gia có chuyên môn phù hợp.",
    note: "Nếu em hoặc một người bạn đang có nguy cơ bị tổn thương ngay lập tức, hãy báo ngay cho người lớn đáng tin cậy ở gần, nhân viên có trách nhiệm hoặc dịch vụ khẩn cấp phù hợp. Không nên giữ bí mật một mình khi sự an toàn đang bị đe dọa.",
    people: [
      { id: "co-so-y-te", name: "Cơ sở y tế có dịch vụ sức khỏe tâm thần phù hợp", desc: "Nơi có người có chuyên môn đánh giá và hỗ trợ khi khó khăn kéo dài hoặc nặng hơn.", fallback: true },
      { id: "chuyen-gia", name: "Chuyên gia tâm lý có chuyên môn và thông tin xác minh được", desc: "Hãy cùng người lớn kiểm tra kỹ chuyên môn và nguồn thông tin trước khi liên hệ.", fallback: true },
      { id: "khan-cap", name: "Dịch vụ hỗ trợ khẩn cấp phù hợp", desc: "Dành cho trường hợp có nguy cơ mất an toàn. Hãy báo ngay cho người lớn ở gần để được hỗ trợ kịp thời.", fallback: true },
    ],
  },
];

export const STEPS = [
  { t: "NHẬN RA VÀ QUAN TÂM", body: ["Chú ý khi bạn có biểu hiện khác thường so với chính mình, chẳng hạn ít giao tiếp hơn, thường xuyên buồn bã, thu mình hoặc chia sẻ rằng mình đang gặp áp lực. Những dấu hiệu này không đủ để kết luận bạn bị trầm cảm, nhưng có thể là lý do để hỏi thăm."], say: ["Mình thấy gần đây cậu có vẻ không được vui. Cậu có muốn chia sẻ với mình không?"] },
  { t: "LẮNG NGHE KHÔNG PHÁN XÉT", body: ["Để bạn nói theo tốc độ của mình.", "Không chế giễu, so sánh hoặc trách móc.", "Không vội đưa lời khuyên khi bạn chưa sẵn sàng.", "Không ép bạn kể những điều chưa muốn chia sẻ."], say: ["Mình đang lắng nghe cậu.", "Cảm ơn cậu đã tin tưởng chia sẻ.", "Mình chưa chắc hiểu hết những gì cậu đang trải qua, nhưng mình muốn lắng nghe."], avoid: ["Có thế mà cũng buồn.", "Cậu nghĩ nhiều quá thôi.", "Người khác còn khổ hơn cậu."] },
  { t: "ĐỒNG HÀNH, KHÔNG LÀM THAY", body: ["Hãy hỏi bạn muốn được hỗ trợ như thế nào. Có thể cùng bạn đi gặp giáo viên đáng tin cậy, nhân viên y tế trường học hoặc người lớn phù hợp."], say: ["Cậu muốn mình ngồi nghe thêm, hay cậu muốn chúng mình cùng tìm một người có thể hỗ trợ?"], stress: "Bạn bè không cần tự mình giải quyết mọi vấn đề. Em không phải chuyên gia tâm lý và không chịu trách nhiệm một mình về sự an toàn của bạn." },
  { t: "KẾT NỐI VỚI NGƯỜI CÓ TRÁCH NHIỆM", body: ["Nếu khó khăn kéo dài, ảnh hưởng rõ đến sinh hoạt hoặc học tập, hoặc vượt quá khả năng hỗ trợ của em, hãy khuyến khích bạn tìm đến người lớn đáng tin cậy. Nếu có nguy cơ tự làm hại bản thân, bị bạo lực hoặc mất an toàn, cần báo ngay cho người lớn có trách nhiệm; không giữ bí mật trong tình huống nguy hiểm."], say: ["Mình quan tâm đến cậu nên mình muốn chúng ta cùng tìm một người lớn có thể giúp. Mình sẽ đi cùng cậu nếu cậu muốn."] },
  { t: "CHĂM SÓC CHÍNH MÌNH", body: ["Lắng nghe người khác có thể khiến em lo lắng hoặc mệt mỏi. Em cũng cần nghỉ ngơi, giữ ranh giới phù hợp và chia sẻ với người lớn đáng tin cậy khi cảm thấy quá sức."], say: ["Quan tâm đến bạn là điều đáng quý. Chăm sóc bản thân cũng quan trọng không kém."] },
] as { t: string; body: string[]; say: string[]; avoid?: string[]; stress?: string }[];

export type Scenario = { text: string; options: { k: string; text: string; ok: boolean; fb: string }[] };
export const SCENARIOS: Scenario[] = [
  {
    text: "Trong vài ngày gần đây, một người bạn thường ngồi một mình, ít nói hơn và từ chối tham gia các hoạt động chung. Em muốn hỏi thăm nhưng sợ bạn không muốn chia sẻ.",
    options: [
      { k: "A", text: "“Cậu đừng nghĩ nhiều nữa, vui lên đi.”", ok: false, fb: "Câu nói có ý động viên nhưng có thể khiến bạn cảm thấy cảm xúc của mình chưa được lắng nghe. Em có thể thử hỏi thăm nhẹ nhàng hơn." },
      { k: "B", text: "“Mình thấy gần đây cậu có vẻ đang gặp chuyện. Nếu cậu muốn, mình sẵn sàng lắng nghe.”", ok: true, fb: "Đây là cách mở lời phù hợp vì thể hiện sự quan tâm nhưng vẫn tôn trọng quyền chia sẻ của bạn." },
      { k: "C", text: "“Cậu phải kể cho mình biết chuyện gì đã xảy ra.”", ok: false, fb: "Ép bạn kể có thể khiến bạn khó chịu. Hãy cho bạn quyền lựa chọn thời điểm và mức độ chia sẻ." },
    ],
  },
  {
    text: "Một người bạn tâm sự với em về chuyện buồn, rồi nói: “Đừng kể với ai nhé.” Bạn ấy không nhắc gì đến việc mất an toàn.",
    options: [
      { k: "A", text: "Kể lại cho cả nhóm để mọi người cùng an ủi bạn.", ok: false, fb: "Chia sẻ chuyện riêng của bạn khi chưa được đồng ý có thể làm mất lòng tin. Hãy tôn trọng ranh giới bạn đặt ra." },
      { k: "B", text: "“Cảm ơn cậu đã tin mình. Mình sẽ giữ chuyện này, và nếu cậu muốn tìm người lớn hỗ trợ thì mình đi cùng cậu.”", ok: true, fb: "Em vừa tôn trọng ranh giới của bạn, vừa mở ra con đường tìm hỗ trợ khi bạn sẵn sàng." },
      { k: "C", text: "Lảng sang chuyện khác cho bạn quên đi.", ok: false, fb: "Lảng tránh có thể khiến bạn thấy mình không được lắng nghe. Hãy cho bạn biết em đang ở đây." },
    ],
  },
  {
    text: "Bạn em nhắn tin rằng bạn ấy không muốn tiếp tục nữa và nghĩ đến việc làm hại bản thân, rồi dặn em giữ bí mật.",
    options: [
      { k: "A", text: "Giữ bí mật như lời hứa và tự mình khuyên bạn.", ok: false, fb: "Đây là tình huống liên quan đến an toàn. Em không nên giữ bí mật một mình; cần báo ngay cho người lớn đáng tin cậy." },
      { k: "B", text: "Ở bên bạn nếu có thể và báo ngay cho người lớn đáng tin cậy, kể cả khi bạn dặn giữ bí mật.", ok: true, fb: "Đúng vậy. Khi sự an toàn bị đe dọa, việc báo ngay cho người lớn có trách nhiệm là cách quan tâm thật sự." },
      { k: "C", text: "Chờ vài hôm xem bạn có ổn hơn không.", ok: false, fb: "Chờ đợi có thể nguy hiểm. Hãy báo ngay cho người lớn có trách nhiệm hoặc dịch vụ khẩn cấp phù hợp." },
    ],
  },
];

export const REFLECT = ["Được lắng nghe", "Được tôn trọng", "Được đồng hành", "Được giúp đỡ"];
