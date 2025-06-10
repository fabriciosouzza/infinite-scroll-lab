import { ReviewState } from "@/model/order";

export default function getEquivalentReviewStatus(receivedStatus: ReviewState) {
  switch (receivedStatus) {
    case "A":
      return "Aprovado";
    case "R":
      return "Rejeitado";
    case "P":
      return "Pendente";
  }
}
