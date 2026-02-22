import { useState } from 'react'
import { ImageUpload } from '../ImageUpload'
import './CreatePostForm.css'

interface CreatePostFormProps {
    onSubmit: (data: {
        content: string
        images: string[]
        tags: string[]
        postType: 1 | 2  // 1 = findTutor, 2 = share
    }) => void
    isLoading?: boolean
    initialMode?: 'general' | 'photo' | 'tag' | 'findTutor'
}

export const CreatePostForm = ({
    onSubmit,
    isLoading = false,
    initialMode = 'general'
}: CreatePostFormProps) => {
    const [content, setContent] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [postType, setPostType] = useState<1 | 2>(
        initialMode === 'findTutor' ? 1 : 2
    )
    const [showImageUpload, setShowImageUpload] = useState(initialMode === 'photo')
    const [showTagInput, setShowTagInput] = useState(true) // Always show tags by default since it's required

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim()
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag])
            setTagInput('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) {
            alert('Vui lòng nhập nội dung bài viết')
            return
        }

        if (tags.length === 0) {
            alert('Vui lòng thêm ít nhất 1 tag cho bài viết')
            return
        }

        onSubmit({
            content: content.trim(),
            images,
            tags,
            postType
        })

        // Reset form
        setContent('')
        setImages([])
        setTags([])
        setTagInput('')
        setPostType(2)  // Reset to 'share'
    }

    return (
        <form className="create-post-form" onSubmit={handleSubmit}>
            <div className="create-post-form__header">
                <h3>Tạo bài viết mới</h3>
            </div>

            <div className="create-post-form__content">
                <textarea
                    className="create-post-form__textarea"
                    placeholder={postType === 1 ? 'Mô tả nhu cầu tìm gia sư của bạn...' : 'Bạn đang nghĩ gì?'}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                />

                {/* Image Upload Section */}
                {!showImageUpload && (
                    <button
                        type="button"
                        className="create-post-form__toggle-btn"
                        onClick={() => setShowImageUpload(true)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Thêm ảnh/video
                    </button>
                )}
                {showImageUpload && (
                    <div className="create-post-form__section">
                        <div className="create-post-form__section-header">
                            <span>Ảnh/Video</span>
                            {images.length === 0 && (
                                <button
                                    type="button"
                                    className="create-post-form__remove-section"
                                    onClick={() => setShowImageUpload(false)}
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                        <ImageUpload images={images} onChange={setImages} maxImages={5} />
                    </div>
                )}

                {/* Tags Section */}
                {!showTagInput && (
                    <button
                        type="button"
                        className="create-post-form__toggle-btn"
                        onClick={() => setShowTagInput(true)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                            <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        Thêm tags
                    </button>
                )}
                {showTagInput && (
                    <div className="create-post-form__section">
                        <div className="create-post-form__section-header">
                            <span>Tags</span>
                            {tags.length === 0 && (
                                <button
                                    type="button"
                                    className="create-post-form__remove-section"
                                    onClick={() => setShowTagInput(false)}
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                        <div className="create-post-form__tags">
                            <div className="create-post-form__tags-input">
                                <input
                                    type="text"
                                    placeholder="Thêm tags (ví dụ: Toán, Lớp 9)..."
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="create-post-form__add-tag-btn"
                                >
                                    Thêm
                                </button>
                            </div>
                            {tags.length > 0 && (
                                <div className="create-post-form__tags-list">
                                    {tags.map((tag) => (
                                        <span key={tag} className="create-post-form__tag">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="create-post-form__tag-remove"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="create-post-form__type">
                    <button
                        type="button"
                        className={`create-post-form__type-btn ${postType === 1 ? 'active' : ''}`}
                        onClick={() => setPostType(1)}
                    >
                        Tôi muốn tìm gia sư
                    </button>
                    <button
                        type="button"
                        className={`create-post-form__type-btn ${postType === 2 ? 'active' : ''}`}
                        onClick={() => setPostType(2)}
                    >
                        Tôi muốn chia sẻ
                    </button>
                </div>
            </div>

            <div className="create-post-form__footer">
                <button
                    type="submit"
                    className="create-post-form__submit"
                    disabled={isLoading || !content.trim() || tags.length === 0}
                >
                    {isLoading ? 'Đang đăng...' : 'Đăng bài'}
                </button>
            </div>
        </form>
    )
}
