import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headandfoot from "./components/Headandfoot";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";

const LostDetails = () => {
  const { id } = useParams();
  const [lost, setLost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { isSignedIn, user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const fetchLost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/lost/${id}`
        );
        setLost(res.data.lost);
        // Fetch image as blob
        try {
          const imgRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/lost-photo/${id}`
          );
          if (imgRes.ok) {
            const blob = await imgRes.blob();
            setImageUrl(URL.createObjectURL(blob));
          } else {
            setImageUrl("/lostdemo.jpeg");
          }
        } catch {
          setImageUrl("/lostdemo.jpeg");
        }
      } catch (error) {
        console.error("Error fetching Lost details:", error);
      }
    };
    fetchLost();
  }, [id]);

  const handleApply = (e) => {
    e.preventDefault();

    if (
      !applicant.name ||
      !applicant.email ||
      !applicant.phone ||
      !applicant.coverLetter
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Redirect to WhatsApp
    const receiverPhone = lost?.reporterPhone?.replace(/[^0-9]/g, "");
    if (!receiverPhone) {
      toast.error("Reporter phone number is missing or invalid.");
      return;
    }

    const message = `
Hello ${lost.reporterName},

I found your lost item post on the website and I believe this item belongs to me.

Name: ${applicant.name}
Email: ${applicant.email}
Phone: ${applicant.phone}

Message:
${applicant.coverLetter}

Please contact me as soon as possible. Thank you!
    `;

    const whatsappLink = `https://wa.me/${receiverPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = whatsappLink;

    // Show confirmation checkbox after redirect
    setShowModal(false);
  };

  if (!lost) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Headandfoot>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg rounded-4">
              <img
                src={imageUrl || "/default.jpeg"}
                alt={lost.itemName}
                className="card-img-top rounded-top-4"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h2 className="card-title mb-3">{lost.itemName}</h2>
                <p className="card-text mb-2">
                  <strong>Item Type:</strong> {lost.itemType}
                </p>
                <p className="card-text mb-2">
                  <strong>Reporter Phone:</strong> {lost.reporterPhone}
                </p>
                <p className="card-text mb-4">
                  <strong>Reporter Email:</strong>
                  <br />
                  {lost.reporterEmail || "No email provided"}
                </p>
                <p className="card-text mb-4">
                  <strong>Description:</strong>
                  <br />
                  {lost.description || "No description provided"}
                </p>
                <p className="text-muted small">
                  <strong>Posted on:</strong>{" "}
                  {new Date(lost.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="card-footer bg-white text-end">
                {/* Delete button only for lost item poster */}
                {user && lost.postedBy === user.id && (
                  <button
                    className="btn btn-danger me-2"
                    onClick={async () => {
                      if (
                        !window.confirm(
                          "Are you sure you want to delete this lost item?"
                        )
                      )
                        return;
                      try {
                        await axios.delete(
                          `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/delete-lost/${lost._id}`,
                          {
                            data: { userId: user.id },
                          }
                        );
                        toast.success("Lost item deleted successfully!");
                        window.location.href = "/lost-and-found";
                      } catch (err) {
                        toast.error("Failed to delete lost item");
                      }
                    }}
                  >
                    Delete Item
                  </button>
                )}
                <button
                  className="btn btn-success my-3"
                  onClick={() => {
                    if (!isSignedIn) {
                      toast.error("Login to claim the item");
                      return;
                    }
                    setShowModal(true);
                  }}
                >
                  Claim Item
                </button>

                {showModal && (
                  <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content shadow-lg border-0 rounded-4">
                        <form onSubmit={handleApply}>
                          <div className="modal-header border-0 pb-0">
                            <h4 className="modal-title fw-bold">
                              Claim {lost.itemName}
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>

                          <div className="modal-body pt-0">
                            <div className="mt-3 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Name"
                                value={applicant.name}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    name: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mt-3 mb-3">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Your Email"
                                value={applicant.email}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    email: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mt-3 mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Your Phone Number"
                                value={applicant.phone}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    phone: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="mt-3 mb-3">
                              <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Write your message"
                                value={applicant.coverLetter}
                                onChange={(e) =>
                                  setApplicant({
                                    ...applicant,
                                    coverLetter: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>

                          <div className="modal-footer border-0 pt-3">
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Send on WhatsApp
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {showConfirm && !confirmed && (
                  <div className="mt-3">
                    <label className="form-check-label">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                      />
                      Confirm you have got your item?
                    </label>
                    <button
                      className="btn btn-primary ms-3"
                      onClick={async () => {
                        try {
                          await axios.put(
                            `${import.meta.env.VITE_BACKEND_URL}/api/v1/lost/update-status/${lost._id}`,
                            { status: "resolved" }
                          );
                          toast.success("Thank you for confirming!");
                          setConfirmed(true);
                          setShowConfirm(false);
                        } catch (error) {
                          toast.error("Failed to update status");
                        }
                      }}
                      disabled={!confirmed}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Headandfoot>
  );
};

export default LostDetails;
